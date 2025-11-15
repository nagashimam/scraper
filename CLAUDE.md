# Scraping 

You are an expert software engineer specializing in web scraping and data processing. You are building a robust command-line tool using Node.js.

Your task is to write a Node.js script that scrapes a static website, converts its content to Markdown, and saves the files locally. This tool will be used to generate a dataset for a Retrieval-Augmented Generation (RAG) system.

## Requirements & Specifications:

### 1. Input:
* The script will accept a single **starting URL** as a command-line argument (e.g., `node scrape.js https://example.com/guide/`).

### 2. Tooling:
* **HTTP Requests:** Use `axios` to fetch the HTML content. This tool targets *static sites only*.
* **HTML Parsing:** Use `cheerio` to load and parse the HTML response.
* **Markdown Conversion:** Use `turndown` to convert HTML to Markdown.

### 3. Crawling Logic:
* The script must act as a crawler, starting from the input URL.
* It must maintain a queue of URLs to visit and a `Set` of "visited" URLs to prevent re-scraping and infinite loops.
* **Crucial Scoping Rule:** The crawler **must** be restricted to the *starting path* of the input URL.
    * **Example:** If the start URL is `https://example.com/guide/index.html`, the script should *only* crawl links that also start with `https://example.com/guide/`.
    * It must **ignore** all links to other paths (e.g., `https://example.com/tutorial/`) or external domains (e.g., `https://another-domain.com`).
* **Crawl Depth:** The crawl should continue indefinitely (no max depth) *within* the path scope defined above.

### 4. Content Scraping & Conversion:
* For each scraped page, find the target content container using this logic:
    1.  Select the `<main>` element if it exists.
    2.  If no `<main>` element exists, fall back to selecting the `<body>` element.
* Take the HTML *inside* this selected element and convert it to Markdown using `turndown`.
* **Turndown Configuration:**
    * **Code Blocks:** Preserve all `<pre>` blocks and convert them to GitHub-flavored fenced code blocks.
    * **Tables:** Convert `<table>` elements into Markdown tables.
    * **Images:** Exclude all images. Use `turndown.remove('img')` or an equivalent rule to ensure no image tags or Markdown images are in the final output.

### 5. File Output:
* All Markdown files must be saved in a local directory named `./markdown_output`. The script must create this directory if it doesn't exist.
* **File Naming Logic:**
    1.  If the URL ends in `.html` or `.htm`, use the base filename (e.g., `.../guide/page.html` becomes `page.md`).
    2.  If the URL does *not* end in `.html` or `.htm`, use the last segment of the URL path (e.g., `.../guide/api/v1` becomes `v1.md`).
    3.  Handle `index.html` correctly (e.g., `.../guide/index.html` becomes `index.md`).

### 6. Deliverables:
* **`package.json`:** A file listing dependencies (`axios`, `cheerio`, `turndown`).
* **`scrape.js`:** The complete, commented Node.js script that performs all tasks.
* **`README.md`:** A brief file explaining how to install and run the script (`npm install`, `node scrape.js [URL]`).
