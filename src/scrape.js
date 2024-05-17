const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Define the base URLs for the fridge and dishwasher product catalogs
const baseUrls = {
  fridge: 'https://www.partselect.com/Fridge-Parts.htm',
  dishwasher: 'https://www.partselect.com/Dishwasher-Parts.htm'
};

// Asynchronous function to scrape part details based on the part URL
async function scrapePartDetails(partUrl) {
  try {
    console.log(`Scraping part details from: ${partUrl}`);
    // Make a GET request to fetch the HTML content of the part's page
    const response = await axios.get(partUrl);
    
    // Load the HTML content into cheerio for parsing
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the part number from the URL or page content
    const partNumber = partUrl.split('-')[1];

    // Extract the part name from the HTML
    const partName = $('h1.part-title').text().trim();

    // Extract the part description from the HTML
    const description = $('div.part-description').text().trim();

    // Extract the compatibility information from the HTML
    const compatibility = [];
    $('div.compatibility-list li').each((index, element) => {
      compatibility.push($(element).text().trim());
    });

    // Extract the installation instructions from the HTML
    const installationInstructions = $('div.installation-instructions').text().trim();

    // Create an object to store the scraped part details
    const partDetails = {
      partNumber,
      partName,
      description,
      compatibility,
      installationInstructions
    };

    // Log the scraped part details to the console
    console.log(partDetails);

    // Store the scraped data in a JSON file named after the part number
    const filePath = `part_${partNumber}.json`;
    fs.writeFileSync(filePath, JSON.stringify(partDetails, null, 2));
    console.log(`File saved: ${filePath}`);
  } catch (error) {
    // Log an error message if the scraping process fails
    console.error(`Error scraping part details: ${error.message}`);
  }
}

// Asynchronous function to scrape all parts from a catalog page
async function scrapeCatalog(catalogUrl) {
  try {
    console.log(`Scraping catalog from: ${catalogUrl}`);
    // Make a GET request to fetch the HTML content of the catalog page
    const response = await axios.get(catalogUrl);

    // Load the HTML content into cheerio for parsing
    const html = response.data;
    const $ = cheerio.load(html);

    // Find all part links on the catalog page
    const partLinks = [];
    $('a.part-title').each((index, element) => {
      const partLink = $(element).attr('href');
      if (partLink) {
        partLinks.push(`https://www.partselect.com${partLink}`);
      }
    });

    console.log(`Found ${partLinks.length} part links`);

    // Scrape details for each part
    for (const partLink of partLinks) {
      await scrapePartDetails(partLink);
    }
  } catch (error) {
    // Log an error message if the scraping process fails
    console.error(`Error scraping catalog: ${error.message}`);
  }
}

// Scrape both fridge and dishwasher catalogs
(async () => {
  await scrapeCatalog(baseUrls.fridge);
  await scrapeCatalog(baseUrls.dishwasher);
})();
