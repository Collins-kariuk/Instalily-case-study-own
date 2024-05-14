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

app.listen(port, () => {
    console.log(`Server is running on <http://localhost>:${port}`);
});
