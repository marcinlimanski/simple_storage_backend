const axios = require('axios');
const config = require('../config');

async function getBalance() {
    const url = config.KALEIDO_BASE_URL;
    const headers = {
        'accept': 'application/json',
        'Authorization': config.SIMPLE_STORAGE_AUTH_HEADER
    };

    try {
        const response = await axios.get(url, { headers });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function setBalance(newBalance) {
    const url = config.KALEIDO_BASE_URL
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': config.SIMPLE_STORAGE_AUTH_HEADER
    };

    const data = {
        x: newBalance
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    getBalance,
    setBalance
};