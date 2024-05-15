// Import the Express framework
const express = require('express');

// Import the CORS middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen
const port = 5001;

// Use the CORS middleware to allow requests from different origins
app.use(cors());

// Use the JSON middleware to automatically parse JSON data in request bodies
app.use(express.json());

// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req, res) => {
    // simple message to confirm backend is running
    res.send('Backend is running');
});

// Define a route handler for POST requests to the '/query' URL
app.post('/query', (req, res) => {
    // Extract the 'query' property from the request body
    const userQuery = req.body.query;
    
    // Initialize a default response message
    let message = 'Default response';
  
    // Check if the user query contains certain keywords and update the response message accordingly
    if (userQuery.includes('install part number PS11752778')) {
      message = 'To install part number PS11752778, follow these steps...';
    } else if (userQuery.includes('compatible with my WDT780SAEM1 model')) {
      message = 'Yes, part number PS11752778 is compatible with the WDT780SAEM1 model.';
    } else if (userQuery.includes('ice maker on my Whirlpool fridge is not working')) {
      message = 'To fix the ice maker on your Whirlpool fridge, try the following steps...';
    } else {
      message = 'I am not sure how to help with that. Please provide more details or try a different query.';
    }

    // Log the user query and the response message to the console for debugging
    console.log(`Received query: ${userQuery}, Responding with message: ${message}`);

    // Send the response message as a JSON object
    res.json({ message });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    // Log a message to the console to indicate that the server is running
    console.log(`Server is running on http://localhost:${port}`);
});
