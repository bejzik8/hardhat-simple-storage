require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-verify')
require('dotenv').config()
require('./tasks/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ''
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: 'hardhat',
    networks: {
        sepolia: {
            chainId: 11155111,
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY]
        },
        localhost: {
            chainId: 31337,
            url: 'http://127.0.0.1:8545/'
        }
    },
    solidity: '0.8.8',
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
        enabled: true,
        outputFile: 'gas-report.txt',
        noColors: true,
        currency: 'USD',
        coinmarketcap: COINMARKETCAP_API_KEY
    }
}
