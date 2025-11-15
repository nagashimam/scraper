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
- `turndown-plugin-gfm` - For GitHub Flavored Markdown support (tables, etc.)

## Usage

There are two ways to specify which URLs to scrape:

### Option 1: Command-Line Argument (Quick)

Run the scraper with a starting URL:

```bash
node scrape.js <URL>
```

**Examples:**

Scrape a documentation site:
```bash
node scrape.js https://example.com/guide/
```

Scrape starting from a specific page:
```bash
node scrape.js https://example.com/docs/index.html
```

### Option 2: Config File (Multiple URLs)

Create or edit `scrape.config.json` in the project root:

```json
{
  "urls": [
    "https://example.com/guide/",
    "https://example.com/docs/",
    "https://another-site.com/api/"
  ]
}
```

Then run without arguments:

```bash
node scrape.js
```

The scraper will process each URL in sequence.

**Note:** If you provide a command-line argument, it takes priority over the config file.

## How It Works

1. **Path Scoping**: The crawler only follows links within the same path as the starting URL. For example, if you start at `https://example.com/guide/`, it will only crawl pages that begin with `https://example.com/guide/`.

2. **Content Extraction**: For each page, the script extracts content from the `<main>` element if it exists, otherwise from the `<body>` element.

3. **Markdown Conversion**: The extracted HTML is converted to Markdown with:
   - Code blocks preserved as fenced code blocks
   - Tables converted to Markdown tables
   - Images removed

4. **File Naming**:
   - URLs ending in `.html` or `.htm`: Creates directory structure matching URL path, changes extension to `.md` (e.g., `http://example.com/foo/bar/index.html` → `example.com/foo/bar/index.md`)
   - Other URLs: Last directory segment becomes filename, rest becomes directory path (e.g., `http://example.com/foo/bar/` → `example.com/foo/bar.md`)

5. **Output**: All Markdown files are saved in the `./markdown_output` directory (automatically created if it doesn't exist).

## Output

All scraped content is saved to the `./markdown_output` directory. Each page becomes a separate `.md` file named according to the URL structure.

## Limitations

- Only works with static websites (no JavaScript rendering)
- Requires the target site to be accessible via HTTP/HTTPS
- Respects the path scope of the starting URL

## License

ISC
