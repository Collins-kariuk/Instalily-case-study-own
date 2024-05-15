const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Endpoint to handle user queries
app.post('/query', (req, res) => {
    const userQuery = req.body.query;
    
    // Process the user query
    let message = 'Default response';
  
    if (userQuery.includes('install part number PS11752778')) {
      message = 'To install part number PS11752778, follow these steps...';
    } else if (userQuery.includes('compatible with my WDT780SAEM1 model')) {
      message = 'Yes, part number PS11752778 is compatible with the WDT780SAEM1 model.';
    } else if (userQuery.includes('ice maker on my Whirlpool fridge is not working')) {
      message = 'To fix the ice maker on your Whirlpool fridge, try the following steps...';
    } else {
      message = 'I am not sure how to help with that. Please provide more details or try a different query.';
    }
    console.log('Received query: ${userQuery}, Responding with message: ${message}');
    res.json({ message });
  });

app.listen(port, () => {
    console.log(`Server is running on <http://localhost>:${port}`);
});
