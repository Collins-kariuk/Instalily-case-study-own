// Import the axios library for making HTTP requests
const axios = require('axios');

// Import the cheerio library for parsing and manipulating HTML
const cheerio = require('cheerio');

// Import the fs (file system) module for reading and writing files
const fs = require('fs');

// Define the base URL of the website to be scraped
const url = 'https://www.partselect.com/';

// Asynchronous function to scrape part details based on the part number
async function scrapePartDetails(partNumber) {
  try {
    // Make a GET request to fetch the HTML content of the part's page
    const response = await axios.get(`${url}${partNumber}`);
    
    // Load the HTML content into cheerio for parsing
    const html = response.data;
    const $ = cheerio.load(html);

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
    fs.writeFileSync(`part_${partNumber}.json`, JSON.stringify(partDetails, null, 2));
  } catch (error) {
    // Log an error message if the scraping process fails
    console.error(`Error scraping part details: ${error.message}`);
  }
}

// Call the function to scrape details for a specific part number (example part number 'PS11752778')
scrapePartDetails('PS11752778');
