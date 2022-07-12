# Cheerio Web Scraper

## This is one of my  project in learning web scraping, and this one uses Cheerio to parse the HTML
## PS: None of these are being used for commercial purposes. Learning and research only.

### Cheerio is a fast, flexible and lean implementation of core jQuery designed specifically for the server, and so many of this selecting methods is familiar to or sometimes the same as JQuery
### Fore more: https://cheerio.js.org/

## Instruction:
> Please run the code under ./Scrapers/  (make ./Scrapers/ your working dir)
> First, save the HTML file using save_html.js locally so we don't spam get request that get labeled as a bot by the server.
> Then, use cheerio to parse the HTML file saved locally to get the data we want.
> In this example, I collected data from https://cryptoslam.io/

## Learning Notes
* In selecting by class using Cheerio/JQuery, every class should have a dot in front of it.<br/>
For example: ```$(.table.table-hover.js-top-by-sales-table-24h.summary-sales-table)```

* Iterating with index: ```$(this).find('td').each(function(i) {...})```
