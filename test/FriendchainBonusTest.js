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
        await RewardContract.setPromoterValue(6,12,1000,2000);

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

        value = BigNumber.from("100000000000000000000");
        await NFTCollection2.connect(addr1).createDefincubatorNFT(
            owner.address,
            1
        );
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


       await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr10 after buy reward box 2', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr10 after buy reward box 3', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        //await BusdContract.connect(addr10).approve(RewardContract.address , BigNumber.from("9000"+"000000000000000000"));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            4 //package 1,1
        );
        console.log('balance addr10 after buy reward box 4', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 4', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            5 //package 1,1
        );
        console.log('balance addr10 after buy reward box 5', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 5', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance addr10 after buy reward box 6', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 6', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        //await BusdContract.mint(RewardContract.address , BigNumber.from("15500"+"000000000000000000"));
        //await BusdContract.connect(addr10).approve(RewardContract.address , BigNumber.from("19200"+"000000000000000000"));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            7 //package 1,1
        );
        console.log('balance addr10 after buy reward box 7', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 7', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            8 //package 1,1
        );
        console.log('balance addr10 after buy reward box 8', ethers.utils.formatUnits(await BusdContract.connect(addr10).balanceOf(addr10.address),decimals));
        console.log('balance addr3 sponsor of addr10 after buy reward box 8', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        const addr11 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr11 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 before buy  RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
             1 //package 1,1
         );
        console.log('balance addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        const addr12 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr12 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            1 //package 1,1
            );
        console.log('balance addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr12).balanceOf(addr12.address),decimals));
        console.log('balance addr3 sponsor of addr12 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        const addr13 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr13 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr13 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr13 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            3//package 1,1
        );
        console.log('balance addr13 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            4//package 1,1
        );
        console.log('balance addr13 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr13).balanceOf(addr13.address),decimals));
        console.log('balance addr3 sponsor of addr13 after buy RB4', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        const addr14 = await newWallet(addr1, BusdContract, RewardContract);
            console.log('balance addr14 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
            console.log('balance addr3 sponsor of addr14 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
            await NFTCollection1.connect(addr14).createDefincubatorNFT(
                addr13.address,//sponsorul(referal)
                1 //package 1,1
            );
            console.log('balance addr14 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr14).balanceOf(addr14.address),decimals));
            console.log('balance addr3 sponsor of addr14 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        const addr15 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr15 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));
        console.log('balance addr3 sponsor of addr15 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr15 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));
        console.log('balance addr3 sponsor of addr15 after buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        const addr16 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr16 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance addr16 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            2 //package 1,1
        );
        console.log('balance addr16 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy RB2', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            3 //package 1,1
        );
        console.log('balance addr16 after buy RB3a', ethers.utils.formatUnits(await BusdContract.connect(addr16).balanceOf(addr16.address),decimals));
        console.log('balance addr3 sponsor of addr16 after buy RB3', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        console.log('balance PerformancePool after all buy RB', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));


        console.log('balance PerformancePool after all buy', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));



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
