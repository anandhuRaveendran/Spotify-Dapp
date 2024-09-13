require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"sepolia",
  networks: {
    localhost: {
      url:"http://127.0.0.1:8545/"
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/eloqM4tZVjsuFEenH-bfqhnMqINwW8m0",
      accounts:["c28bfcfe9e5ac6dfaf8b7ab5886abdacdb9ab8773ab024a775677ea101a88bb9"]
    }
  },
  solidity: "0.8.24",
};
