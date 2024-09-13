require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"sepolia",
  networks: {
    localhost: {
      url:"http://127.0.0.1:8545/"
    },
    sepolia: {
      url: "infura rpc",
      accounts:["private key"]
    }
  },
  solidity: "0.8.24",
};
