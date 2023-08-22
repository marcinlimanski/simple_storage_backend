const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { getBalance, setBalance } = require('./utils/api_simple_storage');

app.use(express.json(), cors());


// GET storage balance
app.get('/balance', async (req, res) => {
    try {
        const balance = await getBalance();
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching balance.' });
    }
});

app.post('/setBalance', async (req, res) => {
    const newBalance = req.body.x;

    try {
        await setBalance(newBalance);
        res.json({ message: 'Balance set successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while setting balance.' });
    }
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };