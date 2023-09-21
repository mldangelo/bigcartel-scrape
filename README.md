# Lisa Hanawalt Art Shop Scraper

This repository contains a script and a GitHub Action to scrape artworks from [Lisa Hanawalt's Art Shop](https://lisahanawalt.bigcartel.com/category/original-art) and save the results in a JSON file named `artworks.json`.

## Overview

The script uses `axios` to fetch the webpage and `jsdom` to parse and extract the desired information. The extracted details include the title, price, status, and link of each artwork. The results are then sorted by title and saved to `artworks.json`.

The GitHub Action runs the script every 10 minutes, on pushes to the `main` branch, and can also be manually triggered. If there are changes to the `artworks.json` file, the action commits and pushes the changes to the repository. Additionally, an email notification is sent when updates are detected.

## Script Details

The main script, `index.js`, performs the following steps:

1. Fetches the webpage of Lisa Hanawalt's original art category.
2. Parses the HTML content using `jsdom`.
3. Extracts details of each artwork, including:
   - Title
   - Price
   - Status (e.g., "Sold Out")
   - Link to the artwork's page
4. Sorts the artworks by title.
5. Saves the results to `artworks.json`.

## Usage

To run the script locally:

1. Ensure you have Node.js installed.
2. Install the required packages:

    ```bash
    npm install axios jsdom
    ```

3. Run the script:

    ```bash
    node index.js
    ```

After execution, check the `artworks.json` file for the scraped data.

## GitHub Action

The GitHub Action is set up to:

- Run every 30 minutes.
- Trigger on pushes to the `main` branch.
- Allow manual triggering via workflow dispatch.

If the scraped data changes, the action will:

1. Commit the updated `artworks.json` file.
2. Push the changes to the repository.
3. Send an email notification about the update.
