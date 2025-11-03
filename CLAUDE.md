# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web scraper for Lisa Hanawalt's Big Cartel art shop (https://lisahanawalt.bigcartel.com/). The scraper extracts artwork information (title, price, status, link) and saves it to `artworks.json`. A GitHub Action runs every 30 minutes to detect and commit changes automatically.

## Common Commands

### Running the scraper
```bash
npm start
# or
node index.js
```

### Installing dependencies
```bash
npm install
```

### Linting
```bash
npx eslint .
```

## Architecture

### Core Scraping Logic (index.js)
- Uses `axios` to fetch the products page
- Uses `jsdom` to parse HTML and extract data from `.prod-thumb` elements
- Extracts: title (`.prod-thumb-name`), price (`.prod-thumb-price`), status (`.prod-thumb-status`), and link
- Sorts artworks alphabetically by title
- Writes JSON to `artworks.json` with 4-space indentation

### GitHub Actions Workflow (.github/workflows/scrape.yml)
- Triggered on: push to main, every 30 minutes (cron), manual dispatch
- Runs `npm start` to scrape
- Checks for git diff changes
- If `artworks.json` changed, commits and pushes automatically
- Creates a GitHub issue notification when updates are detected

## Code Style

The project uses ESLint with the Airbnb base config. Key configuration:
- ES2021 environment
- Latest ECMAScript version
- Module source type

## Important Notes

- Node version: >=20.0.0 (specified in .nvmrc and package.json engines)
- The scraper depends on Big Cartel's HTML structure remaining consistent
- DOM selectors: `.prod-thumb`, `.prod-thumb-name`, `.prod-thumb-price`, `.prod-thumb-status`
