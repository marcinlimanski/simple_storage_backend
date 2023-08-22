const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../server'); // Import app and server
const { getBalance, setBalance } = require('../utils/api_simple_storage');
const nock = require('nock');
const {response} = require("express");

chai.use(chaiHttp);
const expect = chai.expect;

const getBalanceResponse = {
    "balance": {
        "output": 0
    }
};
const setBalanceResponse = 'Balance set successfully.';

// Mock the APIs
const mockGetBalance = nock('https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io')
    .get('/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/getBalance')
    .query(true) // Allow any query parameters
    .reply(200, getBalanceResponse); // Simulate API response

const mockSetBalance = nock('https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io')
    .post('/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/set')
    .query(true) // Allow any query parameters
    .reply(200, { message: 'Balance set successfully.' }); // Simulate API response

describe('API Tests', () => {
    after(() => {
        server.close(); // Close the server after tests are done
    });

    describe('getBalance', () => {
        it('should get balance from the API', async () => {
            const balance = await getBalance();
            console.log("DEBUG: " + balance.balance)
            expect(balance).to.be.a('object');
        });
    });

    describe('setBalance', () => {
        it('should set balance using the API', async () => {
            const newBalance = 6;
            const response = await setBalance(newBalance);
            expect(response).to.have.property('message', setBalanceResponse);
        });
    });
});
