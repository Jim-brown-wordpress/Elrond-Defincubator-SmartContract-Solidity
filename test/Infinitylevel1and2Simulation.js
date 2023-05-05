const {
    time , loadFixture
} = require('@nomicfoundation/hardhat-network-helpers');

const {ethers} = require("hardhat");
const {expect} = require('chai');
const { BigNumber } = require('ethers');
const decimals = 18;

//require("hardhat-gas-reporter");

describe("All Contract Test" , () => {

    /*
       <!----------------------- Format ------------------>
    */
    const deployTokenFixtrue = async () => {
        const [
            owner, addr1 , addr2 , addr3 , addr4, source1 , destination1 , source2 , destination2,
            PerformancePoolAddress ,
            DaoTreasureAddress ,
            InfluenceAddress ,
        ] = await ethers.getSigners();

        const DefincubatorNFT = await ethers.getContractFactory("DefincubatorNFT");
        const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");
        const Token = await ethers.getContractFactory("Token");

        const BusdContract = await Token.deploy("Binanace USD" , "BUSD");
        const RewardContract = await DefincubatorReward.deploy();

        await RewardContract.setAddresses(
            BusdContract.address,
            PerformancePoolAddress.address ,
            DaoTreasureAddress.address ,
            InfluenceAddress.address ,
        );

        await RewardContract.setRewardPeriodWeeks(10);

        await RewardContract.setFriendChainRewardRate(5 , 1);
        await RewardContract.setFriendChainRewardRate(5 , 2);
        await RewardContract.setFriendChainRewardRate(5 , 3);
        await RewardContract.setFriendChainRewardRate(5 , 4);
        await RewardContract.setFriendChainRewardRate(5 , 5);

        await RewardContract.setPoolValue(50000);//5
        await RewardContract.setPromoterValue(6,12,250000,500000);

        const decimals = 18;


        return {
            owner ,addr1 , addr2 , addr3 , addr4, source1 , destination1 , source2 , destination2,

            RewardContract , BusdContract,

            DefincubatorNFT , DefincubatorReward , Token,

            PerformancePoolAddress ,DaoTreasureAddress ,InfluenceAddress ,

            decimals
        }
    }

    it("add New Collection" , async () => {
        const {
            owner, addr1 , addr2 , addr3 , addr4, source1 , destination1 , source2 , destination2,

            RewardContract , BusdContract,

            DefincubatorNFT , DefincubatorReward , Token,

            PerformancePoolAddress ,DaoTreasureAddress ,InfluenceAddress ,

            decimals
        } = await loadFixture(deployTokenFixtrue);

        const ClapContract = await Token.deploy("Clap Token" , "Clap");

        const NFTCollection1 = await DefincubatorNFT.deploy("nft1" , 'nft1' , 1 , "pinata1/" , RewardContract.address);

        await RewardContract.setPayPlan1(1 , 1 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 1 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 2 , 200 , 160 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 2 , 2000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 3 , 400 , 400 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 3 , 2500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 4 , 800 , 960 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 4 , 3000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 5 , 1600 , 2240 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 5 , 3500 , 500 , 200 ,300 , 1000 , 2000);

        await RewardContract.setPayPlan1(1 , 6 , 3200 , 5120 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 6 , 4000 , 500 , 200 ,300 , 1000 , 1500);

        await RewardContract.setPayPlan1(1 , 7 , 6400 , 11520 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 7 , 4500 , 500 , 200 ,300 , 1000 , 1000);

        await RewardContract.setPayPlan1(1 , 8 , 12800 , 25600 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 8 , 5000 , 500 , 200 ,300 , 1000 , 500);


        const TribalContract = await Token.deploy("Tribal Token"  , 'Trb');

        const NFTCollection2 = await DefincubatorNFT.deploy("nft2" , "nft2" , 2 , "pinata2/" , RewardContract.address);

        await RewardContract.setPayPlan1(2 , 1 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 1 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 2 , 200 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 2 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 3 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 3 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 4 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 4 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 5 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 5 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 6 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 6 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 7 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 7 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 8 , 100 , 60 , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 8 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        expect(await RewardContract.nCollections()).to.equal(2);
        console.log(await RewardContract.collectionAddresses(1));
        console.log(await RewardContract.collectionAddresses(2));

        console.log(await RewardContract.payPlan(1 , 1));

        let balance = BigNumber.from("100000000000000000000000");
        await RewardContract.approve(addr1.address);
        await BusdContract.mint(addr1.address , balance);
        await BusdContract.connect(addr1).approve(RewardContract.address , balance);

        console.log('balance PerformancePool before buy', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure before buy', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        await NFTCollection1.connect(addr1).createDefincubatorNFT(
            owner.address,
            1
        );

        console.log(await NFTCollection1.connect(addr1).ownedTokens(addr1.address));
        console.log(await RewardContract.connect(owner).persons(addr1.address));
        console.log(await BusdContract.connect(owner).balanceOf(owner.address)/10 **decimals);
        console.log(await BusdContract.connect(owner).balanceOf(RewardContract.address)/10 **decimals);
        console.log(await BusdContract.connect(owner).balanceOf(PerformancePoolAddress.address)/10 **decimals);
        console.log(await BusdContract.connect(owner).balanceOf(InfluenceAddress.address)/10 **decimals);
        console.log(await BusdContract.connect(owner).balanceOf(DaoTreasureAddress.address)/10 **decimals);
        console.log(await BusdContract.connect(owner).balanceOf(destination1.address)/10 **decimals);


        value = BigNumber.from("200"+"000000000000000000");
        await NFTCollection1.connect(addr1).createDefincubatorNFT(
            owner.address,
            2
        );
        console.log('sales volume',(await RewardContract.connect(owner).persons(owner.address)).poolRewardAccumulated/10 **decimals);

        value = BigNumber.from("100000000000000000000");
        await NFTCollection2.connect(addr1).createDefincubatorNFT(
            owner.address,
            1
        );
        console.log('sales volume 2',(await RewardContract.connect(owner).persons(owner.address)).poolRewardAccumulated/10 **decimals);

        console.log('xxx');

        balance = BigNumber.from("100000000000000000000000");
        await RewardContract.approve(addr2.address);
        await BusdContract.mint(addr2.address , balance);
        await BusdContract.connect(addr2).approve(RewardContract.address , balance);

        value = BigNumber.from("100000000000000000000");
        await NFTCollection1.connect(addr2).createDefincubatorNFT(
            addr1.address,
            1
        );

        console.log(await NFTCollection1.connect(addr1).setApprovalForAll(NFTCollection1.address , true));
        console.log(await NFTCollection1.isApprovedForAll( addr1.address ,NFTCollection1.address));

        await RewardContract.connect(addr1).tokenTransfer(addr3.address);
        await NFTCollection1.connect(addr1).tokenTransfer(addr3.address);

        console.log(await RewardContract.connect(addr3).persons(addr3.address));
        console.log(await RewardContract.connect(addr3).persons(addr1.address));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        console.log(await NFTCollection1.connect(addr1).ownedTokens(addr1.address));
        console.log(await NFTCollection1.connect(addr3).ownedTokens(addr3.address));
        // await RewardContract.connect(addr1.address).purchaseNFT(1 , 1, addr1.address ,owner.address);

        console.log('my tests2');
        const addr10 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr10 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr10 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

       await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr10 after buy reward box 2', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr10 after buy reward box 3', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        //await BusdContract.connect(addr10).approve(RewardContract.address , BigNumber.from("9000"+"000000000000000000"));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr10 after buy reward box 4', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 4', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr10 after buy reward box 5', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 5', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr10 after buy reward box 6', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 6', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        //await BusdContract.mint(RewardContract.address , BigNumber.from("15500"+"000000000000000000"));
        //await BusdContract.connect(addr10).approve(RewardContract.address , BigNumber.from("19200"+"000000000000000000"));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr10 after buy reward box 7', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 7', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr10 after buy reward box 8', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 8', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));


        const addr11 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr11 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 before buy  RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
             1 //package 1,1
         );
        console.log('balance addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr11 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr11 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr11 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr11 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr11 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr11 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr11 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        const addr11_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr11_1).createDefincubatorNFT(
                addr11.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr11_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr11_2).createDefincubatorNFT(
                addr11.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr11_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr11_3).createDefincubatorNFT(
                addr11.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr11_4 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr11_4).createDefincubatorNFT(
                addr11.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr12 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr12 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            1 //package 1,1
            );
        console.log('balance addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr12 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr12 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr12 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr12 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr12 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr12 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            8 //package 1,1
        );

        const addr12_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr12_1).createDefincubatorNFT(
                addr12.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr12_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr12_2).createDefincubatorNFT(
                addr12.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        console.log('balance addr12 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        const addr13 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr13 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr13 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr13 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            3//package 1,1
        );
        console.log('balance addr13 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            4//package 1,1
        );
        console.log('balance addr13 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            5//package 1,1
        );
        console.log('balance addr13 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            6//package 1,1
        );
        console.log('balance addr13 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            7//package 1,1
        );
        console.log('balance addr13 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            8//package 1,1
        );
        console.log('balance addr13 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        const addr13_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr13_1).createDefincubatorNFT(
                addr13.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr13_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr13_2).createDefincubatorNFT(
                addr13.address,//sponsorul(referal)
                i //package 1,1
            );
        }


        const addr14 = await newWallet(addr1, BusdContract, RewardContract);
            console.log('balance addr14 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
            console.log('balance addr3 sponsor of addr14 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
            await NFTCollection1.connect(addr14).createDefincubatorNFT(
                addr13.address,//sponsorul(referal)
                1 //package 1,1
            );
            console.log('balance addr14 after buy RB1 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
            console.log('balance addr3 sponsor of addr14 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr14 after buy RB2 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr14 after buy RB3 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr14 after buy RB4 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr14 after buy RB5 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr14 after buy RB6 ', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr14 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr14 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr3 sponsor of addr14 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        const addr14_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr14_1).createDefincubatorNFT(
                addr14.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr14_1a = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_1a).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_1a after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_1a).balanceOf(addr14_1a.address),decimals));

        await NFTCollection1.connect(addr14_1a).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr14_1a after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr14_1a).balanceOf(addr14_1a.address),decimals));

        await NFTCollection1.connect(addr14_1a).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr14_1a after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr14_1a).balanceOf(addr14_1a.address),decimals));

        const addr14_1b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_1b).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_1b after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_1b).balanceOf(addr14_1b.address),decimals));

        await NFTCollection1.connect(addr14_1b).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr14_1b after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr14_1b).balanceOf(addr14_1b.address),decimals));

        const addr14_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr14_2).createDefincubatorNFT(
                addr14.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr14_2a = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_2a).createDefincubatorNFT(
            addr14_2.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_2a after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_2a).balanceOf(addr14_2a.address),decimals));

        const addr14_2b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_2b).createDefincubatorNFT(
            addr14_2.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_2b after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_2b).balanceOf(addr14_2b.address),decimals));

        const addr14_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr14_3).createDefincubatorNFT(
                addr14.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr14_3a = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_3a).createDefincubatorNFT(
            addr14_3.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_3a after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_3a).balanceOf(addr14_3a.address),decimals));

        const addr14_3b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_3b).createDefincubatorNFT(
            addr14_3.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr14_3b after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14_3b).balanceOf(addr14_3b.address),decimals));

        const addr15 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr15 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));
        console.log('balance addr3 sponsor of addr15 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr15 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr15 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr15 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr15 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr15 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        const addr15_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_1).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr15_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_2).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr15_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_3).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr15_4 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_4).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr15_5 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_5).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr15_6 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_6).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr15_7 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr15_7).createDefincubatorNFT(
                addr15.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr16 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr16 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            1 //package 1,1
        );


        console.log('balance addr16 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr16 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));


        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr16 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('balance DaoTreasure after buy RB', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr16 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr16 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr16 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr16 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr16 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        const addr16_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr16_1).createDefincubatorNFT(
                addr16.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr16_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr16_2).createDefincubatorNFT(
                addr16.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr16_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr16_3).createDefincubatorNFT(
                addr16.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr17 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr17).createDefincubatorNFT(
                addr16.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        console.log('balance addr17 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr17).balanceOf(addr17.address),decimals));


        const addr18 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr18 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr18 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr18 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr18 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr18 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr18 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr18 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr18).balanceOf(addr18.address),decimals));


        const addr19 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr19 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr19 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr19 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr19 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr19 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        const addr19_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr19_1).createDefincubatorNFT(
                addr19.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr19_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr19_2).createDefincubatorNFT(
                addr19.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr19_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr19_3).createDefincubatorNFT(
                addr19.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr19_4 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr19_4).createDefincubatorNFT(
                addr19.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr20 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr20 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr20 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr20 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr20 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr20 after buy RB5', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr20 after buy RB6', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr20 after buy RB7', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        await NFTCollection1.connect(addr20).createDefincubatorNFT(
            addr19.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr20 after buy RB8', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));

        const addr20_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr20_1).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr20_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr20_2).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr20_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr20_3).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr20_4 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr20_4).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr20_5 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr20_5).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr21 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21).createDefincubatorNFT(
                addr20.address,//sponsorul(referal)
                i //package 1,1
            );
        }

        const addr21_1 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21_1).createDefincubatorNFT(
                addr21.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr21_2 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21_2).createDefincubatorNFT(
                addr21.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr21_3 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21_3).createDefincubatorNFT(
                addr21.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr21_4 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21_4).createDefincubatorNFT(
                addr21.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr21_5 = await newWallet(addr1, BusdContract, RewardContract);
        for (i=1; i<9; i++) {
            await NFTCollection1.connect(addr21_5).createDefincubatorNFT(
                addr21.address,//sponsorul(referal)
                i //package 1,1
            );
        }
        const addr21_5a = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr21_5 sponsor of addr21_5a before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr21_5).balanceOf(addr21_5.address),decimals));
        console.log('balance addr21 before addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr21).balanceOf(addr21.address),decimals));
        console.log('balance addr20 before addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));
        console.log('balance addr19 before addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        await NFTCollection1.connect(addr21_5a).createDefincubatorNFT(
            addr21_5.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr21_5 sponsor of addr21_5a after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr21_5).balanceOf(addr21_5.address),decimals));
        console.log('balance addr21 after addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr21).balanceOf(addr21.address),decimals));
        console.log('balance addr20 after addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr20).balanceOf(addr20.address),decimals));
        console.log('balance addr19 after addr21_5a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr19).balanceOf(addr19.address),decimals));

        //console.log('balance PerformancePool after all buy', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        //console.log('balance DaoTreasure after all buy', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr10',(await RewardContract.connect(addr10).persons(addr10.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr11',(await RewardContract.connect(addr11).persons(addr11.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr11_1',(await RewardContract.connect(addr11_1).persons(addr11_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr11_2',(await RewardContract.connect(addr11_2).persons(addr11_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr11_3',(await RewardContract.connect(addr11_3).persons(addr11_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr11_4',(await RewardContract.connect(addr11_4).persons(addr11_4.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr12',(await RewardContract.connect(addr12).persons(addr12.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr13',(await RewardContract.connect(addr13).persons(addr13.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr13_1',(await RewardContract.connect(addr13_1).persons(addr13_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr13_2',(await RewardContract.connect(addr13_2).persons(addr13_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14',(await RewardContract.connect(addr14).persons(addr14.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_1',(await RewardContract.connect(addr14_1).persons(addr14_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_1a',(await RewardContract.connect(addr14_1a).persons(addr14_1a.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_1b',(await RewardContract.connect(addr14_1b).persons(addr14_1b.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_2',(await RewardContract.connect(addr14_2).persons(addr14_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_2a',(await RewardContract.connect(addr14_2a).persons(addr14_2a.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_2b',(await RewardContract.connect(addr14_2b).persons(addr14_2b.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_3',(await RewardContract.connect(addr14_3).persons(addr14_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_3a',(await RewardContract.connect(addr14_3a).persons(addr14_3a.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr14_3b',(await RewardContract.connect(addr14_3b).persons(addr14_3b.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15',(await RewardContract.connect(addr15).persons(addr15.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_1',(await RewardContract.connect(addr15_1).persons(addr15_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_2',(await RewardContract.connect(addr15_2).persons(addr15_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_3',(await RewardContract.connect(addr15_3).persons(addr15_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_4',(await RewardContract.connect(addr15_4).persons(addr15_4.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_5',(await RewardContract.connect(addr15_5).persons(addr15_5.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_6',(await RewardContract.connect(addr15_6).persons(addr15_6.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr15_7',(await RewardContract.connect(addr15_7).persons(addr15_7.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr16',(await RewardContract.connect(addr16).persons(addr16.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr16_1',(await RewardContract.connect(addr16_1).persons(addr16_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr17',(await RewardContract.connect(addr17).persons(addr17.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr18',(await RewardContract.connect(addr18).persons(addr18.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr19',(await RewardContract.connect(addr19).persons(addr19.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr19_1',(await RewardContract.connect(addr19_1).persons(addr19_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr19_2',(await RewardContract.connect(addr19_2).persons(addr19_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr19_3',(await RewardContract.connect(addr19_3).persons(addr19_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr19_4',(await RewardContract.connect(addr19_4).persons(addr19_4.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20',(await RewardContract.connect(addr20).persons(addr20.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20_1',(await RewardContract.connect(addr20_1).persons(addr20_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20_2',(await RewardContract.connect(addr20_2).persons(addr20_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20_3',(await RewardContract.connect(addr20_3).persons(addr20_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20_4',(await RewardContract.connect(addr20_4).persons(addr20_4.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr20_5',(await RewardContract.connect(addr20_5).persons(addr20_5.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21',(await RewardContract.connect(addr21).persons(addr21.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21_1',(await RewardContract.connect(addr21_1).persons(addr21_1.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21_2',(await RewardContract.connect(addr21_2).persons(addr21_2.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21_3',(await RewardContract.connect(addr21_3).persons(addr21_3.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21_4',(await RewardContract.connect(addr21_4).persons(addr21_4.address)).poolRewardAccumulated/10 **decimals);
        console.log('sales volume addr21_5',(await RewardContract.connect(addr21_5).persons(addr21_5.address)).poolRewardAccumulated/10 **decimals);

        //console.log('balance addr3 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        //console.log('balance addr10 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        //console.log('balance addr11 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        //console.log('balance addr12 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        //console.log('balance addr13 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        //console.log('balance addr14 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        //console.log('balance addr15 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));
        //console.log('balance addr16 before split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        //console.log('PerfPool after all', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await BusdContract.connect(PerformancePoolAddress).approve(RewardContract.address , BigNumber.from("100000"+"000000000000000000"));
        await RewardContract.connect(owner).sendPoolReward();

        console.log('balance addr3 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance addr10 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr11 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr12 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr13 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr14 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
        console.log('balance addr15 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));
        console.log('balance addr16 after split PerfPool', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));

        const addr13_1a = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr13_1 sponsor of addr13_1a before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13_1).balanceOf(addr13_1.address),decimals));
        console.log('balance addr13 before addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr12 before addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr11 before addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));

        // await time.increase(3600 * 24 * 31);
        await time.increase(34190000);

        await NFTCollection1.connect(addr13_1a).createDefincubatorNFT(
            addr13_1.address,//sponsorul(referal)
            1 //package 1,1
        );

        console.log('balance addr13_1 sponsor of addr13_1a after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13_1).balanceOf(addr13_1.address),decimals));
        console.log('balance addr13 after addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr12 after addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr11 after addr13_1a buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));


    })
    it("" , () => {

    })
    it("" , () => {

    })
});

async function newWallet(addr1, BusdToken, Reward) {
    const newWallet = ethers.Wallet.createRandom();

    const newSigner = newWallet.connect(ethers.provider);

    const transaction = await addr1.sendTransaction({
        to: newSigner.address,
        value: ethers.utils.parseEther('1'),
    });
    await transaction.wait();

    const mintValue = BigNumber.from("100000"+"000000000000000000");
    await BusdToken.mint(newSigner.address, mintValue);
    const approveValue = BigNumber.from("100000"+"000000000000000000");
    await BusdToken.connect(newSigner).approve(Reward.address , approveValue);
    return newSigner;
}
