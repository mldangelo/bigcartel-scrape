const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const baseUrl = 'https://lisahanawalt.bigcartel.com';

async function scrapeArtworks() {
  const response = await axios.get(`${baseUrl}/category/original-art`);
  const dom = new JSDOM(response.data);
  const { document } = dom.window;
  const productDivs = Array.from(document.querySelectorAll('.prod-thumb'));
  const artworks = productDivs.map((productDiv) => ({
    title: productDiv.querySelector('.prod-thumb-name').textContent.trim(),
    price: parseFloat(productDiv.querySelector('.prod-thumb-price').textContent.trim().replace(/[^\d.]/g, '')),
    status: productDiv.querySelector('.prod-thumb-status').textContent.trim().replace(/\//g, '').trim(),
    link: `${baseUrl}${productDiv.href}`,
  }));
  const json = JSON.stringify(artworks.sort((a, b) => a.title.localeCompare(b.title)), null, 4);
  fs.writeFileSync('artworks.json', json);
}

scrapeArtworks();
