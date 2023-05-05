const { ethers } = require("hardhat");
const { BigNumber } = require('ethers');

////////////////////////////
//////// PARAMETER /////////
////////////////////////////

const rewardTokenName = "Clap Token";
const rewardTokenSymbol = "Clap";


const collectionName = 'Defincubator Collection 1';
const collectionSymbol = 'Def1';
const pinataURL = 'https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/';
const rewardContractAddress = '0x2192056cC07181C4639962E64B9103F03E7000Fe';

const rewardTokenSourceAddress = '0x6D7B8CaBAA20CAAd9F3F7F0174538d467eA4EdA6';
const rewardTokenDestinationAddress = '0xFf123B681fCf13d140a5D1BC450b763c08733041';

const payPlans1 = [
    {
        boxPrice: 100, // 100busd
        rewardTokenTotalAmount: 60, // 60 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 200, // 200busd
        rewardTokenTotalAmount: 160, // 160 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 400, // 400busd
        rewardTokenTotalAmount: 400, // 400 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 800, // 800busd
        rewardTokenTotalAmount: 960, // 960 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 1600, // 1600busd
        rewardTokenTotalAmount: 2240, // 2240 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 3200, // 3200busd
        rewardTokenTotalAmount: 5120, // 5120 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 6400, // 6400busd
        rewardTokenTotalAmount: 11520, // 11520 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
    {
        boxPrice: 12800, // 12800busd
        rewardTokenTotalAmount: 25600, // 25600 token without 10 ** decimals
        sourceAddr: rewardTokenSourceAddress,
        destinationAddr: rewardTokenDestinationAddress
    },
]

const payPlans2 = [
    {
        payRate: 1500, //15%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 2500 //25%
    },
    {
        payRate: 2000, //20%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 2500 //25%
    },
    {
        payRate: 2500, //25%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 2500 //25%
    },
    {
        payRate: 3000, //30%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 2500 //25%
    },
    {
        payRate: 3500, //35%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 2000 //20%
    },
    {
        payRate: 4000, //15%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 1500 //15%
    },
    {
        payRate: 4500, //45%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 1000 //10%
    },
    {
        payRate: 5000, //50%
        performancePoolRate: 500, //5%
        infinity1Rate: 200, //2%
        infinity2Rate: 300, //3%
        influencerRate: 1000, //10%
        treasureRate: 500 //5%
    },
]


const rewardTokenContractMintToSourceAddressValue = BigNumber.from("9999999999"+"000000000000000000");
////////////////////////////
////////////////////////////
////////////////////////////

const main = async () => {
    const DefincubatorNFT = await ethers.getContractFactory("DefincubatorNFT");
    const Token = await ethers.getContractFactory("Token");
    const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");

    const rewardTokenContract = await Token.deploy(rewardTokenName , rewardTokenSymbol);
    await rewardTokenContract.deployed();

    const rewardContract = await DefincubatorReward.attach(rewardContractAddress);

    const collectionID = await rewardContract.nCollections();
    collectionID++;

    const NFTCollection1 = await DefincubatorNFT.deploy(
        collectionName ,
        collectionSymbol,
        collectionID,
        pinataURL,
        rewardContractAddress
    );
    NFTCollection1.deployed();


    for(let i = 0; i < 8; i++ ){
        await rewardContract.setPayPlan1(
            collectionID ,
            i+1,
            payPlans1[i].boxPrice,
            payPlans1[i].rewardTokenTotalAmount,
            rewardContract.address,
            payPlans1[i].sourceAddr,
            payPlans1[i].destinationAddr
        );
        await rewardContract.setPayPlan2(
            collectionID ,
            i+1,
            payPlans2[i].payRate,
            payPlans2[i].performancePoolRate,
            payPlans2[i].infinity1Rate,
            payPlans2[i].infinity2Rate,
            payPlans2[i].influencerRate,
            payPlans2[i].treasureRate
        );
    }

    await rewardTokenContract.mint(rewardTokenSourceAddress ,rewardTokenContractMintToSourceAddressValue );

    console.log(
        `------------< result >------------
        nCollections is ${await rewardContract.nCollections()}
        added collection address is ${await rewardContract.collectionAddresses(await rewardContract.nCollections())}
        reware pay plan is
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 1)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 2)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 3)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 4)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 5)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 6)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 7)}
            ${await rewardContract.payPlan(await rewardContract.nCollections() , 8)}

        balance of source address is
            ${await rewardTokenContract.balanceOf(rewardTokenSourceAddress)}
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
