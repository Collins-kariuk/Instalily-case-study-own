const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Add your endpoints here
// Example endpoint for fetching part details
app.get('/part/:partNumber', async (req, res) => {
    const partNumber = req.params.partNumber;
    try {
        // Make an API request to PartSelect or your data source
        const response = await axios.get(`https://api.partselect.com/parts/${partNumber}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching part details');
    }
});

app.listen(port, () => {
    console.log(`Server is running on <http://localhost>:${port}`);
});
