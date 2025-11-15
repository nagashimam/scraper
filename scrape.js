const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const OUTPUT_DIR = './markdown_output';

/**
 * Initialize the Turndown service with custom configuration
 */
function initializeTurndown() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  // Use GitHub Flavored Markdown plugin for proper table conversion
  turndownService.use(gfm);

  // Remove all images
  turndownService.remove('img');

  return turndownService;
}

/**
 * Get the base path from a URL to restrict crawling scope
 * Example: https://example.com/guide/page.html -> https://example.com/guide/
 */
function getBasePath(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;

  // If the path ends with a filename (contains extension), get the directory
  if (pathname.match(/\.(html?|htm)$/i)) {
    pathname = path.dirname(pathname);
  }

  // Ensure the path ends with a slash
  if (!pathname.endsWith('/')) {
    pathname += '/';
  }

  return `${urlObj.origin}${pathname}`;
}

/**
 * Check if a URL is within the allowed scope (same base path)
 */
function isInScope(url, basePath) {
  try {
    const fullUrl = url.startsWith('http') ? url : new URL(url, basePath).href;
    return fullUrl.startsWith(basePath);
  } catch (error) {
    return false;
  }
}

/**
 * Convert a URL to a relative file path for saving
 * Examples:
 * - http://example.com/foo/bar/index.html -> example.com/foo/bar/index.md
 * - http://example.com/foo/bar/ -> example.com/foo/bar.md
 */
function urlToFilepath(url) {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  let pathname = urlObj.pathname;

  // Remove trailing slash if present
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // If URL ends with .html or .htm, convert extension to .md
  if (pathname.match(/\.(html?|htm)$/i)) {
    // Keep the full path structure, just change extension
    pathname = pathname.replace(/\.(html?|htm)$/i, '.md');
    return path.join(hostname, pathname);
  }

  // If no file extension, treat the last segment as a directory
  // and make it the filename with .md extension
  if (pathname === '' || pathname === '/') {
    // Root path case
    return path.join(hostname, 'index.md');
  }

  // Split path and use last segment as filename
  const segments = pathname.split('/').filter(seg => seg.length > 0);
  if (segments.length === 0) {
    return path.join(hostname, 'index.md');
  }

  // Last segment becomes the filename, rest becomes directory structure
  const filename = segments.pop() + '.md';
  const dirPath = segments.length > 0 ? segments.join('/') : '';

  return path.join(hostname, dirPath, filename);
}

/**
 * Fetch and parse a single page
 */
async function scrapePage(url, turndownService) {
  try {
    console.log(`Scraping: ${url}`);

    // Fetch the HTML content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WebScraperBot/1.0)',
      },
      timeout: 10000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract content from <main> or <body>
    let contentHtml;
    const mainElement = $('main');
    if (mainElement.length > 0) {
      contentHtml = mainElement.html();
    } else {
      contentHtml = $('body').html();
    }

    // Convert to Markdown
    const markdown = turndownService.turndown(contentHtml || '');

    // Extract links for crawling
    const links = [];
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        try {
          // Resolve relative URLs
          const absoluteUrl = new URL(href, url).href;
          // Remove hash fragments
          const cleanUrl = absoluteUrl.split('#')[0];
          if (cleanUrl && cleanUrl !== url) {
            links.push(cleanUrl);
          }
        } catch (error) {
          // Ignore invalid URLs
        }
      }
    });

    return { markdown, links };
  } catch (error) {
    console.error(`Error scraping ${url}: ${error.message}`);
    return { markdown: null, links: [] };
  }
}

/**
 * Save markdown content to a file
 */
function saveMarkdown(url, markdown) {
  const relativePath = urlToFilepath(url);
  const filepath = path.join(OUTPUT_DIR, relativePath);

  // Ensure the directory structure exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the file (overwrite if exists since URL-based paths should be unique)
  fs.writeFileSync(filepath, markdown, 'utf-8');
  console.log(`Saved: ${filepath}`);
}

/**
 * Main crawling function
 */
async function crawl(startUrl) {
  const basePath = getBasePath(startUrl);
  console.log(`Starting crawl from: ${startUrl}`);
  console.log(`Base path (scope): ${basePath}`);
  console.log('---');

  const visited = new Set();
  const queue = [startUrl];
  const turndownService = initializeTurndown();

  while (queue.length > 0) {
    const url = queue.shift();

    // Skip if already visited
    if (visited.has(url)) {
      continue;
    }

    // Mark as visited
    visited.add(url);

    // Scrape the page
    const { markdown, links } = await scrapePage(url, turndownService);

    // Save the markdown if scraping was successful
    if (markdown) {
      saveMarkdown(url, markdown);
    }

    // Add in-scope links to the queue
    for (const link of links) {
      if (!visited.has(link) && isInScope(link, basePath)) {
        queue.push(link);
      }
    }

    // Small delay to be polite to the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('---');
  console.log(`Crawl complete! Scraped ${visited.size} pages.`);
}

// Main execution
(async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Error: No URL provided');
    console.error('Usage: node scrape.js <URL>');
    console.error('Example: node scrape.js https://example.com/guide/');
    process.exit(1);
  }

  const startUrl = args[0];

  // Validate URL
  try {
    new URL(startUrl);
  } catch (error) {
    console.error(`Error: Invalid URL: ${startUrl}`);
    process.exit(1);
  }

  await crawl(startUrl);
})();
