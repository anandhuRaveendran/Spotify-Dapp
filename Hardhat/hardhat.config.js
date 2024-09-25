require("@nomicfoundation/hardhat-ignition")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"sepolia",
  networks: {
    localhost: {
      url:"http://127.0.0.1:8545/"
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/15afd28d8e0e450b800bd4e53b6e982f",
      accounts:["c28bfcfe9e5ac6dfaf8b7ab5886abdacdb9ab8773ab024a775677ea101a88bb9"]
    }
  },
  solidity: "0.8.24",
};
