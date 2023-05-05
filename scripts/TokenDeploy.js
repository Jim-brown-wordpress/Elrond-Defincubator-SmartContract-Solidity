const { ethers } = require("hardhat");

////////////////////////////
//////// PARAMETER /////////
////////////////////////////

const TokenName = "Binance USD";
const TokenSymbol = "BUSD";

////////////////////////////
////////////////////////////
////////////////////////////


const main = async () => {
    const Token = await ethers.getContractFactory("Token");
    const TokenContract = await Token.deploy(TokenName , TokenSymbol);
    TokenContract.deployed();

    console.log(`${TokenName} Contract is deployed to:` , TokenContract.address);

    // defincubatorReward.
}


const runMain = async () => {
    try {
        await main()
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

runMain();
