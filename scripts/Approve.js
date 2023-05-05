const { ethers } = require("hardhat");

////////////////////////////
//////// PARAMETER /////////
////////////////////////////

const rewardContractAddress = '0x2192056cC07181C4639962E64B9103F03E7000Fe';
const toAddress = '0xC3Adb5247f26dfe050Aa7F3c265F76B0ec323c3e';

////////////////////////////
////////////////////////////
////////////////////////////


const main = async () => {
    const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");
    const rewardContract = await DefincubatorReward.attach(rewardContractAddress);

    await rewardContract.approve(toAddress);

    console.log(
        `
            ----------<result>--------
            toAddress is invited by ${await rewardContract.invitedBy(toAddress)}
        `
    );
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
