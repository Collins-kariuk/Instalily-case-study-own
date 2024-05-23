const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Load the scraped data
const partsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'scrapedPartsData.json'), 'utf8'));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.post('/query', (req, res) => {
    const userQuery = req.body.query.toLowerCase();
    let message = 'I am not sure how to help with that. Please provide more details or try a different query.';

    for (const partNumber in partsData) {
        const part = partsData[partNumber];
        if (userQuery.includes(partNumber.toLowerCase())) {
            if (userQuery.includes('install')) {
                message = `To install part number ${partNumber}, follow these steps: ${part.installationInstructions}`;
            } else if (userQuery.includes('compatible')) {
                const model = userQuery.split('compatible with my ')[1];
                if (part.compatibility.includes(model.toUpperCase())) {
                    message = `Yes, part number ${partNumber} is compatible with the ${model} model.`;
                } else {
                    message = `No, part number ${partNumber} is not compatible with the ${model} model.`;
                }
            } else {
                message = `Here is some information about part number ${partNumber}: ${part.description}`;
            }
            break;
        }
    }

    res.json({ message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
