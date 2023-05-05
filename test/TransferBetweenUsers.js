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

        let clapbalance = BigNumber.from("100000"+"000000000000000000");
        await ClapContract.connect(source1).approve(RewardContract.address , clapbalance);
        await ClapContract.mint(source1.address , clapbalance);

        await RewardContract.setPayPlan1(1 , 1 , 100 , BigNumber.from("60"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 1 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 2 , 200 ,  BigNumber.from("160"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 2 , 2000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 3 , 400 , BigNumber.from("400"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 3 , 2500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 4 , 800 , BigNumber.from("960"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 4 , 3000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(1 , 5 , 1600 , BigNumber.from("2240"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 5 , 3500 , 500 , 200 ,300 , 1000 , 2000);

        await RewardContract.setPayPlan1(1 , 6 , 3200 , BigNumber.from("5120"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 6 , 4000 , 500 , 200 ,300 , 1000 , 1500);

        await RewardContract.setPayPlan1(1 , 7 , 6400 , BigNumber.from("11520"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 7 , 4500 , 500 , 200 ,300 , 1000 , 1000);

        await RewardContract.setPayPlan1(1 , 8 , 12800 , BigNumber.from("25600"+"000000000000000000") , ClapContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(1 , 8 , 5000 , 500 , 200 ,300 , 1000 , 500);


        const TribalContract = await Token.deploy("Tribal Token"  , 'Trb');
        let tribalbalance = BigNumber.from("100000"+"000000000000000000");
        await TribalContract.connect(source1).approve(RewardContract.address , tribalbalance);
        await TribalContract.mint(source1.address , tribalbalance);


        const NFTCollection2 = await DefincubatorNFT.deploy("nft2" , "nft2" , 2 , "pinata2/" , RewardContract.address);

        await RewardContract.setPayPlan1(2 , 1 , 100 , BigNumber.from("120"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 1 , 1500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 2 , 200 ,  BigNumber.from("320"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 2 , 2000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 3 , 400 , BigNumber.from("800"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 3 , 2500 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 4 , 800 , BigNumber.from("1920"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 4 , 3000 , 500 , 200 ,300 , 1000 , 2500);

        await RewardContract.setPayPlan1(2 , 5 , 1600 , BigNumber.from("4480"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 5 , 3500 , 500 , 200 ,300 , 1000 , 2000);

        await RewardContract.setPayPlan1(2 , 6 , 3200 , BigNumber.from("10240"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 6 , 4000 , 500 , 200 ,300 , 1000 , 1500);

        await RewardContract.setPayPlan1(2 , 7 , 6400 , BigNumber.from("23040"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 7 , 4500 , 500 , 200 ,300 , 1000 , 1000);

        await RewardContract.setPayPlan1(2 , 8 , 12800 , BigNumber.from("51200"+"000000000000000000") , TribalContract.address, source1.address , destination1.address);
        await RewardContract.setPayPlan2(2 , 8 , 5000 , 500 , 200 ,300 , 1000 , 500);

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

        console.log(await NFTCollection1.connect(addr1).setApprovalForAll(RewardContract.address , true));
        console.log(await NFTCollection1.isApprovedForAll( addr1.address ,RewardContract.address));

        await RewardContract.connect(addr1).tokenTransfer(addr3.address);


        // console.log(await RewardContract.connect(addr1).setApprovalForAll(RewardContract.address , true));
        // console.log(await RewardContract.isApprovedForAll( addr1.address ,RewardContract.address));
        // await NFTCollection1.connect(addr1).tokenTransfer(addr3.address);

        console.log(await RewardContract.connect(addr3).persons(addr3.address));
        console.log(await RewardContract.connect(addr3).persons(addr1.address));

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);

        console.log(await NFTCollection1.connect(addr1).ownedTokens(addr1.address));
        console.log(await NFTCollection1.connect(addr3).ownedTokens(addr3.address));
        // await RewardContract.connect(addr1.address).purchaseNFT(1 , 1, addr1.address ,owner.address);

        console.log('my tests2');
        const addr10 = await newWallet(addr1, BusdContract, RewardContract);
         await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            1 //package 1,1
        );

       await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            7 //package 1,1
        );
        await NFTCollection1.connect(addr10).createDefincubatorNFT(
            addr3.address,//sponsorul(referal)
            8 //package 1,1
        );

        const addr11 = await newWallet(addr1, BusdContract, RewardContract);
       await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
             1 //package 1,1
         );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            7 //package 1,1
        );

        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            8 //package 1,1
        );

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
        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            1 //package 1,1
            );

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            4 //package 1,1
        );
     await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr12).createDefincubatorNFT(
            addr11.address,//sponsorul(referal)
            7 //package 1,1
        );

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

        const addr13 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            1 //package 1,1
        );

        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            2 //package 1,1
        );

        console.log('sales volume addr3',(await RewardContract.connect(addr3).persons(addr3.address)).poolRewardAccumulated/10 **decimals);


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            3//package 1,1
        );

        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            4//package 1,1
        );

        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            5//package 1,1
        );


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            6//package 1,1
        );


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            7//package 1,1
        );


        await NFTCollection1.connect(addr13).createDefincubatorNFT(
            addr12.address,//sponsorul(referal)
            8//package 1,1
        );

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
         await NFTCollection1.connect(addr14).createDefincubatorNFT(
                addr13.address,//sponsorul(referal)
                1 //package 1,1
            );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            7 //package 1,1
        );

        await NFTCollection1.connect(addr14).createDefincubatorNFT(
            addr13.address,//sponsorul(referal)
            8 //package 1,1
        );

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

        await NFTCollection1.connect(addr14_1a).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr14_1a).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            3 //package 1,1
        );

        const addr14_1b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_1b).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            1 //package 1,1
        );

        await NFTCollection1.connect(addr14_1b).createDefincubatorNFT(
            addr14_1.address,//sponsorul(referal)
            2 //package 1,1
        );

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

        const addr14_2b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_2b).createDefincubatorNFT(
            addr14_2.address,//sponsorul(referal)
            1 //package 1,1
        );

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

        const addr14_3b = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr14_3b).createDefincubatorNFT(
            addr14_3.address,//sponsorul(referal)
            1 //package 1,1
        );

        const addr15 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            1 //package 1,1
        );

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr15).createDefincubatorNFT(
            addr14.address,//sponsorul(referal)
            6 //package 1,1
        );
        console.log('balance PerformancePool after all buy', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));

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
        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            1 //package 1,1
        );


        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            7 //package 1,1
        );

        await NFTCollection1.connect(addr16).createDefincubatorNFT(
            addr15.address,//sponsorul(referal)
            8 //package 1,1
        );

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



        const addr18 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            1 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            2 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            3 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            4 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            5 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            6 //package 1,1
        );

        await NFTCollection1.connect(addr18).createDefincubatorNFT(
            addr17.address,//sponsorul(referal)
            7 //package 1,1
        );


        const addr19 = await newWallet(addr1, BusdContract, RewardContract);
        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            1 //package 1,1
        );

        await NFTCollection1.connect(addr19).createDefincubatorNFT(
            addr18.address,//sponsorul(referal)
            2 //package 1,1
        );

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
        console.log('sales volume addr15',(await RewardContract.connect(addr15).persons(addr15.address)).poolRewardAccumulated/10 **decimals);
        console.log('balance addr15 after all buy', ethers.utils.formatUnits(await BusdContract.connect(addr15).balanceOf(addr15.address),decimals));

        await BusdContract.connect(PerformancePoolAddress).approve(RewardContract.address , BigNumber.from("100000"+"000000000000000000"));
        await RewardContract.connect(owner).sendPoolReward();


        const addr23 = await newWallet(addr1, BusdContract, RewardContract);

        // console.log('balance addr23 before transfer', ethers.utils.formatUnits(await BusdContract.connect(addr23).balanceOf(addr23.address),decimals));
        // console.log('balance PerformancePool before transfer', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('sales volume addr23 before transfer',(await RewardContract.connect(addr23).persons(addr23.address)).poolRewardAccumulated/10 **decimals);

        console.log(await RewardContract.connect(addr15).setApprovalForAll(RewardContract.address , true));
        console.log(await NFTCollection1.connect(addr15).setApprovalForAll(NFTCollection1.address , true));
        console.log('isApprovedForAll RewardContract:', await RewardContract.isApprovedForAll( addr15.address ,RewardContract.address));
        console.log('isApprovedForAll NFTCollection1:', await NFTCollection1.isApprovedForAll( addr15.address ,NFTCollection1.address));


        // await RewardContract.connect(addr15).tokenTransfer(addr23.address);
        // await NFTCollection1.connect(addr15).tokenTransfer(addr23.address);
        // await RewardContract.approve(addr15.address);

        // console.log('balance addr23 after transfer', ethers.utils.formatUnits(await BusdContract.connect(addr23).balanceOf(addr23.address),decimals));
        // console.log('balance PerformancePool after transfer', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        console.log('sales volume addr23 after transfer',(await RewardContract.connect(addr23).persons(addr23.address)).poolRewardAccumulated/10 **decimals);


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
