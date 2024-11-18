require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const PK = vars.get("PK");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost:{
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 11155111,
      accounts: [`0x${PK}`]
    },
    holesky: {
      url: `https://holesky.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 17000,
      accounts: [`0x${PK}`]
    }
  },
  etherscan:{
    apiKey:{
      sepolia:ETHERSCAN_API_KEY,
      holesky:ETHERSCAN_API_KEY
    }
  }
};