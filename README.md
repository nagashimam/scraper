# Web Scraper to Markdown

A command-line tool that scrapes static websites and converts their content to Markdown format. Perfect for generating datasets for Retrieval-Augmented Generation (RAG) systems.

## Features

- Crawls static websites starting from a given URL
- Restricts crawling to the same path scope as the starting URL
- Extracts content from `<main>` or `<body>` elements
- Converts HTML to clean Markdown format
- Preserves code blocks and tables
- Removes images from output
- Prevents infinite loops and duplicate scraping
- Saves output to organized local files

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

This will install the required packages:
- `axios` - For making HTTP requests
- `cheerio` - For parsing HTML
- `turndown` - For converting HTML to Markdown

## Usage

Run the scraper with a starting URL:

```bash
node scrape.js <URL>
```

### Examples

Scrape a documentation site:
```bash
node scrape.js https://example.com/guide/
```

Scrape starting from a specific page:
```bash
node scrape.js https://example.com/docs/index.html
```

## How It Works

1. **Path Scoping**: The crawler only follows links within the same path as the starting URL. For example, if you start at `https://example.com/guide/`, it will only crawl pages that begin with `https://example.com/guide/`.

2. **Content Extraction**: For each page, the script extracts content from the `<main>` element if it exists, otherwise from the `<body>` element.

3. **Markdown Conversion**: The extracted HTML is converted to Markdown with:
   - Code blocks preserved as fenced code blocks
   - Tables converted to Markdown tables
   - Images removed

4. **File Naming**:
   - URLs ending in `.html` or `.htm`: uses the base filename (e.g., `page.html` → `page.md`)
   - Other URLs: uses the last path segment (e.g., `/api/v1` → `v1.md`)
   - Special case: `index.html` → `index.md`

5. **Output**: All Markdown files are saved in the `./markdown_output` directory (automatically created if it doesn't exist).

## Output

All scraped content is saved to the `./markdown_output` directory. Each page becomes a separate `.md` file named according to the URL structure.

## Limitations

- Only works with static websites (no JavaScript rendering)
- Requires the target site to be accessible via HTTP/HTTPS
- Respects the path scope of the starting URL

## License

ISC
