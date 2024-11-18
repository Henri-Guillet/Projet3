const hre = require("hardhat");
const { verify } = require("../utils/verify");
const { vars } = require("hardhat/config");

async function main() {

const arguments =[]  
    const voting = await hre.ethers.deployContract("Voting", arguments);
    await voting.waitForDeployment();

    console.log(`contract deployed to ${voting.target}`);

    if(!hre.network.name.includes('localhost') && vars.get("ETHERSCAN_API_KEY")){
        console.log('Verifying...');
        await verify(voting.target, arguments)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});