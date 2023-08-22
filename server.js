const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json(), cors());


// GET storage balance
app.get('/storage_balance', (req, res) => {
    console.log(req.ip)
    res.json("");
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };