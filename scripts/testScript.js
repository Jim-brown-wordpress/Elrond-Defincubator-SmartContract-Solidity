const { ethers } = require("hardhat")

const main = async () => {

    ///nft collection 0x1712542794a2dd803438218ddd8b881C1Ba41BFF
    ///reward contract 0x4e6BA25AA573197598B1B69Fb308b5cf8D3ae3Bb

    const NftContract = await ethers.getContractFactory("DefincubatorNFT");
    const nftContract = await NftContract.attach("0x1712542794a2dd803438218ddd8b881C1Ba41BFF");

    const RewardContract = await ethers.getContractFactory("DefincubatorReward");
    const rewardContract = await RewardContract.attach("0x4e6BA25AA573197598B1B69Fb308b5cf8D3ae3Bb");

    console.log(await rewardContract.collectionAddresses(1));
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
