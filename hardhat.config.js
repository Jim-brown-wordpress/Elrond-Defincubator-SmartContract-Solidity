/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat-gas-reporter");


module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: 'testnet',
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.ACCOUNT_KEY]
    },
    testnet: {
      url: 'https://data-seed-prebsc-1-s3.binance.org:8545',
      chainId: 97,
      accounts: [process.env.ACCOUNT_KEY]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.ACCOUNT_KEY]
    }
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  }
};
