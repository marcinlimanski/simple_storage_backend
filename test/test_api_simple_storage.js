const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const { getBalance, setBalance } = require('../utils/api_simple_storage');
const nock = require('nock');

chai.use(chaiHttp);
const expect = chai.expect;

// Mock the APIs
const mockGetBalance = nock('https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io')
    .get('/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/getBalance')
    .query(true) // Allow any query parameters
    .reply(200, '100'); // Simulate API response

const mockSetBalance = nock('https://u0xv62mbgj-u0etdf90is-connect.us0-aws.kaleido.io')
    .post('/instances/0xd5f8c1cee64d44adab4c7466f848252ea74db6dd/set')
    .query(true) // Allow any query parameters
    .reply(200, { message: 'Balance set successfully.' }); // Simulate API response

describe('API Tests', () => {
    describe('getBalance', () => {
        it('should get balance from the API', async () => {
            const balance = await getBalance();
            expect(balance).to.be.a('number'); 
        });
    });

    describe('setBalance', () => {
        it('should set balance using the API', async () => {
            const newBalance = 6;
            const response = await setBalance(newBalance);
            expect(response).to.have.property('message', 'Balance set successfully.');
        });
    });
});
