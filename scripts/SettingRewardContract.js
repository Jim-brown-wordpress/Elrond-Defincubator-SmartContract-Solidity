const { ethers } = require("hardhat")

////////////////////////////
//////// PARAMETER /////////
////////////////////////////

const rewardContractAddress = "0x2192056cC07181C4639962E64B9103F03E7000Fe";

const busdContractAddress = "0xD3Dbd09e0E0aF59cd25e6dC19D33448215A74901";
const performancePoolAddress = "0xC3Adb5247f26dfe050Aa7F3c265F76B0ec323c3e";
const daoTreasureAddress = "0x1C938629A1881452eEC803370648Fd27A3f536c4";
const influenceAddress = "0x334BA5743721E9F67E5EA1E80F37Fe031f2A3E51";

const rewardPeroidWeeks = 10; // 10 weeks
const friendChainRewardRates = [5, 5, 5, 5, 5]; //5% 5% 5% 5% 5%

const poolQualificationPrice = 50000; // 50000busd

const firstPromoterQualificationPeriod = 6; // 6 months
const secondPromoterQualificationPeriod = 12; // 12 months

const firstPromoterQualificationPrice = 1000; //1000 busd
const secondPromoterQualificationPrice = 2000; //2000 busd

////////////////////////////
////////////////////////////
////////////////////////////

const main = async () => {

    const RewardContract = await ethers.getContractFactory("DefincubatorReward");
    const rewardContract = await RewardContract.attach(rewardContractAddress);

    await rewardContract.setAddresses(
        busdContractAddress,
        performancePoolAddress,
        daoTreasureAddress,
        influenceAddress
    );

    await rewardContract.setFriendChainRewardRate(friendChainRewardRates[0] , 1);
    await rewardContract.setFriendChainRewardRate(friendChainRewardRates[1] , 2);
    await rewardContract.setFriendChainRewardRate(friendChainRewardRates[2] , 3);
    await rewardContract.setFriendChainRewardRate(friendChainRewardRates[3] , 4);
    await rewardContract.setFriendChainRewardRate(friendChainRewardRates[4] , 5);


    await rewardContract.setPoolValue(poolQualificationPrice);
    await rewardContract.setPromoterValue(
        firstPromoterQualificationPeriod,
        secondPromoterQualificationPeriod,
        firstPromoterQualificationPrice,
        secondPromoterQualificationPrice
    );

    console.log(
        '-------------< result >------------ \n',
        `nCollections is ${await rewardContract.nCollections()} \n`,
        `nBoxesOfCollection is ${await rewardContract.nBoxesOfCollection()} \n`,
        `decimals is ${await rewardContract.decimals()} \n`,
        '-----------------------------------'
    )
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
