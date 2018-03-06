module.exports = {
    networks: {
        development: {
            network_id: "*",
            host: 'localhost',
            port: 8545,
            gas: 4000000,
            gasPrice: 20e9
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'USD',
            gasPrice: 21
        }
    }
};
