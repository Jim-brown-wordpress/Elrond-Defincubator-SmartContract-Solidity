const { ethers } = require("hardhat")

const main = async () => {
    const DefincubatorNFT = await ethers.getContractFactory("DefincubatorNFT");
    const defincubatorNFT = await DefincubatorNFT.deploy("DefincubatorNFT" , "Def");
    defincubatorNFT.deployed();

    console.log("Contract is deployed to:" , defincubatorNFT.address);
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
