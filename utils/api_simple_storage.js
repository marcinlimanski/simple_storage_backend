const axios = require('axios');
const config = require('../config');

async function getBalance() {
    const url = 'https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/getBalance?kld-from=0xde2b1cd9d6210605e7207154f8cbd63e0a67309b';
    const headers = {
        'accept': 'application/json',
        'Authorization': config.SIMPLE_STORAGE_AUTH_HEADER
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function setBalance(newBalance) {
    const url = 'https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/set?kld-from=0xde2b1cd9d6210605e7207154f8cbd63e0a67309b&kld-sync=true';
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
        throw error;
    }
}

module.exports = {
    getBalance,
    setBalance
};