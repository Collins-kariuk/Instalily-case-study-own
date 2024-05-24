// Import required modules
const express = require('express');
const cors = require('cors'); // Import the cors module for enabling CORS to allow cross-origin requests
const fs = require('fs'); // Import the file system module to read/write files

// Create an Express application
const app = express(); // Initialize the Express application
const port = 5001; // Define the port number on which the server will listen

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Load the scraped data
const partsData = JSON.parse(fs.readFileSync('scrapedPartsData.json', 'utf8')); // Read and parse the scraped parts data from a JSON file

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Backend is running'); // Send a simple response to indicate that the backend is running
});

// Define a route to handle user queries
app.post('/query', (req, res) => {
    const userQuery = req.body.query.toLowerCase(); // Convert the user query to lowercase
    let message = 'I am not sure how to help with that. Please provide more details or try a different query.'; // Default message if no match is found

    // Loop through each part in the parts data
    for (const partNumber in partsData) {
        const part = partsData[partNumber]; // Get the part details for the current part number
        if (userQuery.includes(partNumber.toLowerCase())) { // Check if the user query contains the part number
            if (userQuery.includes('install')) { // Check if the query is about installation
                message = `To install part number ${partNumber}, follow these steps: ${part.installationInstructions}`; // Provide installation instructions
            } else if (userQuery.includes('compatible')) { // Check if the query is about compatibility
                const model = userQuery.split('compatible with my ')[1]; // Extract the model number from the query
                if (part.compatibility.includes(model.toUpperCase())) { // Check if the part is compatible with the model
                    message = `Yes, part number ${partNumber} is compatible with the ${model} model.`; // Confirm compatibility
                } else {
                    message = `No, part number ${partNumber} is not compatible with the ${model} model.`; // Deny compatibility
                }
            } else {
                message = `Here is some information about part number ${partNumber}: ${part.description}`; // Provide general part information
            }
            break; // Exit the loop after finding the relevant part
        }
    }

    res.json({ message }); // Send the response as JSON
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log a message to indicate the server is running
});
