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

        let clapbalance = BigNumber.from("100000"+"000000000000000000");
        await ClapContract.connect(source1).approve(RewardContract.address , clapbalance);
        await ClapContract.mint(source1.address , clapbalance);



        //console.log('balance PerformancePool before buy', ethers.utils.formatUnits(await BusdContract.connect(PerformancePoolAddress).balanceOf(PerformancePoolAddress.address),decimals));
        //console.log('balance DaoTreasure before buy', ethers.utils.formatUnits(await BusdContract.connect(DaoTreasureAddress).balanceOf(DaoTreasureAddress.address),decimals));

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


        const addr11 = await newWallet(addr1, BusdContract, RewardContract);
        console.log('balance addr11 before buy RB1', ethers.utils.formatUnits(await BusdContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance addr3 sponsor of addr11 before buy  RB1', ethers.utils.formatUnits(await BusdContract.connect(addr3).balanceOf(addr3.address),decimals));
        await NFTCollection1.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
             1 //package 1,1
         );

        await NFTCollection2.connect(addr11).createDefincubatorNFT(
            addr10.address,//sponsorul(referal)
            1 //package 1,1
        );
        console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance Tribal addr11 before claim', ethers.utils.formatUnits(await TribalContract.connect(addr11).balanceOf(addr11.address),decimals));

        await time.increase(3600*24*8);
        await RewardContract.connect(addr11).claimToken();

        console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        console.log('balance Tribal addr11 after claim', ethers.utils.formatUnits(await TribalContract.connect(addr11).balanceOf(addr11.address),decimals));

        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*22);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*78);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*85);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));

        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     2 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     3 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     4 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     5 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     6 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     7 //package 1,1
        // );
        //
        // await NFTCollection1.connect(addr11).createDefincubatorNFT(
        //     addr10.address,//sponsorul(referal)
        //     8 //package 1,1
        // );
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*8);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*22);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*78);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // console.log('balance CLP addr11 before claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //
        // await time.increase(3600*24*85);
        // await RewardContract.connect(addr11).claimToken();
        //
        // console.log('balance CLP addr11 after claim', ethers.utils.formatUnits(await ClapContract.connect(addr11).balanceOf(addr11.address),decimals));
        //

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
