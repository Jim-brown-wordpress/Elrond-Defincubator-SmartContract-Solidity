const { ethers } = require("hardhat");

const main = async () => {
    const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");
    const defincubatorReward = await DefincubatorReward.deploy();
    defincubatorReward.deployed();

    console.log("Reward Contract is deployed to:" , defincubatorReward.address);

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
