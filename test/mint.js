
const {
    time , loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");

const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("All Test" , function(){

    async function deployTokenFixture(){

        const [
            owner ,
            addr1 ,
            addr2 ,
            addr3 ,
            addr4 ,
            cpTokenAddr ,
            tbTokenAddr ,
            ppAddr ,
            influAddr ,
            daoAddr
        ] = await ethers.getSigners();

        const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");
        const Token = await ethers.getContractFactory("Token");

        const Reward = await DefincubatorReward.deploy();

        const BusdToken = await Token.deploy("Binance USD" , "BUSD");
        const ClapToken = await Token.deploy("Clap USD" , "CLAP");
        const TribalToken = await Token.deploy("Tribal USD" , "TRIBAL");

        await Reward.setAddresses(
            BusdToken.address,

            ClapToken.address,
            cpTokenAddr.address,
            TribalToken.address,
            tbTokenAddr.address,

            ppAddr.address,
            daoAddr.address,
            influAddr.address
        );

        await Reward.setRewardBoxPrice(100 , 1);
        await Reward.setRewardBoxPrice(200 , 2);
        await Reward.setRewardBoxPrice(400 , 3);
        await Reward.setRewardBoxPrice(800 , 4);
        await Reward.setRewardBoxPrice(1600 , 5);
        await Reward.setRewardBoxPrice(3200 , 6);
        await Reward.setRewardBoxPrice(6400 , 7);
        await Reward.setRewardBoxPrice(12800 , 8);

        await Reward.setBoxReward(30 , 1);
        await Reward.setBoxReward(40 , 2);
        await Reward.setBoxReward(50 , 3);
        await Reward.setBoxReward(60 , 4);
        await Reward.setBoxReward(70 , 5);
        await Reward.setBoxReward(80 , 6);
        await Reward.setBoxReward(90 , 7);
        await Reward.setBoxReward(100 , 8);

        await Reward.setTokenMaxReward(50 , 250);
        await Reward.setRewardPeriodWeeks(10);

        await Reward.setFriendChainRewardRate(10 , 1);
        await Reward.setFriendChainRewardRate(5 , 2);
        await Reward.setFriendChainRewardRate(5 , 3);
        await Reward.setFriendChainRewardRate(5 , 4);
        await Reward.setFriendChainRewardRate(5 , 5);

        await Reward.setPoolValue(5 , 200);
        await Reward.setPromoterValue(2,3,6,12,1000,2000);
        await Reward.setOtherRewardRates(1250,1250,2500,500,1000);


        return {
            Reward ,
            BusdToken ,
            ClapToken ,
            TribalToken ,
            owner ,
            addr1 ,
            addr2 ,
            addr3 ,
            addr4 ,
            cpTokenAddr,
            tbTokenAddr ,
            ppAddr ,
            influAddr ,
            daoAddr
        }

    }

    // it("payable function sample" , async () => {
    //     const {BusdToken , Reward , owner , addr1 , addr2} = await loadFixture(deployTokenFixture);
    //     await BusdToken.mint(addr1.address , 100);

    //     console.log(await Reward.sample());

        // const x = new BN
        // console.log(await BusdToken.balanceOf(Reward.address));
        // console.log(await BusdToken.balanceOf(addr1.address));
        // console.log(await BusdToken.balanceOf(addr2.address));
        // expect(await BusdToken.balanceOf(addr1.address)).to.equal(50);
    // });

    describe("purchase NFT function test" , () => {
        // it("performance pool gets 5% of total price" , async () => {
        //     const {
        //         Reward ,
        //         BusdToken ,
        //         ClapToken ,
        //         TribalToken ,
        //         owner ,
        //         addr1 ,
        //         addr2 ,
        //         addr3 ,
        //         addr4 ,
        //         cpTokenAddr,
        //         tbTokenAddr ,
        //         ppAddr ,
        //         daoAddr,
        //         influAddr ,
        //     } = await loadFixture(deployTokenFixture);



        //     const decimals = 5;
        //     await BusdToken.mint(addr1.address ,10000 * 10 ** decimals);
        //     await BusdToken.connect(addr1).approve(Reward.address , 30000 * 10 **decimals);
        //     await Reward.connect(addr1).addPerson(owner.address);


        //     await BusdToken.mint(addr2.address ,10000 * 10 ** decimals);
        //     await BusdToken.connect(addr2).approve(Reward.address , 30000 * 10 **decimals);
        //     await Reward.connect(addr2).addPerson(owner.address);


        //     await BusdToken.mint(addr3.address ,10000 * 10 ** decimals);
        //     await BusdToken.connect(addr3).approve(Reward.address , 30000 * 10 **decimals);
        //     await Reward.connect(addr3).addPerson(addr2.address);


        //     await BusdToken.mint(addr4.address ,10000 * 10 ** decimals);
        //     await BusdToken.connect(addr4).approve(Reward.address , 30000 * 10 **decimals);
        //     await Reward.connect(addr4).addPerson(addr2.address);


        //     await BusdToken.connect(ppAddr).approve(Reward.address , 30000 * 10 **decimals);

        //     await ClapToken.mint(cpTokenAddr.address  ,10000 * 10 ** decimals);
        //     await ClapToken.connect(cpTokenAddr).approve(Reward.address , 30000 * 10 **decimals );

        //     await TribalToken.mint(tbTokenAddr.address , 10000 * 10 ** decimals);
        //     await TribalToken.connect(tbTokenAddr).approve(Reward.address ,  30000 * 10 **decimals );

        //     let ownerBal = 0;
        //     let addr1Bal = 0;
        //     let addr2Bal = 0;
        //     let addr3Bal = 0;
        //     let addr4Bal = 0;
        //     let cpTokenAddrBal = 0;
        //     let tbTokenAddrBal = 0;
        //     let ppAddrBal = 0;
        //     let daoAddrBal = 0;
        //     let influAddrBal = 0;
        //     let RewardBal = 0;

        //     async function output(){
        //         console.log("owner" , await Reward.persons(owner.address));
        //         console.log("addr1" ,await Reward.persons(addr1.address));
        //         console.log("addr2" ,await Reward.persons(addr2.address));
        //         console.log("addr3" ,await Reward.persons(addr3.address));
        //         console.log("addr4" ,await Reward.persons(addr4.address));

        //         console.log("owner" , await BusdToken.balanceOf(owner.address) ,`difference is ${await BusdToken.balanceOf(owner.address) - ownerBal}` );
        //         console.log("addr1" ,await BusdToken.balanceOf(addr1.address),`difference is ${await BusdToken.balanceOf(addr1.address) - addr1Bal}`);
        //         console.log("addr2" ,await BusdToken.balanceOf(addr2.address),`difference is ${await BusdToken.balanceOf(addr2.address) - addr2Bal}`);
        //         console.log("addr3" ,await BusdToken.balanceOf(addr3.address),`difference is ${await BusdToken.balanceOf(addr3.address) - addr3Bal}`);
        //         console.log("addr4" ,await BusdToken.balanceOf(addr4.address),`difference is ${await BusdToken.balanceOf(addr4.address) - addr4Bal}`);
        //         console.log("cpTokenAddr" ,await BusdToken.balanceOf(cpTokenAddr.address),`difference is ${await BusdToken.balanceOf(cpTokenAddr.address) - cpTokenAddrBal}`);
        //         console.log("tbTokenAddr" ,await BusdToken.balanceOf(tbTokenAddr.address),`difference is ${await BusdToken.balanceOf(tbTokenAddr.address) - tbTokenAddrBal}`);
        //         console.log("ppAddr" ,await BusdToken.balanceOf(ppAddr.address),`difference is ${await BusdToken.balanceOf(ppAddr.address) - ppAddrBal}`);
        //         console.log("daoAddr" ,await BusdToken.balanceOf(daoAddr.address),`difference is ${await BusdToken.balanceOf(daoAddr.address) - daoAddrBal}`);
        //         console.log("influAddr" ,await BusdToken.balanceOf(influAddr.address),`difference is ${await BusdToken.balanceOf(influAddr.address) - influAddrBal}`);
        //         console.log("Reward" ,await BusdToken.balanceOf(Reward.address),`difference is ${await BusdToken.balanceOf(Reward.address) - RewardBal}`);

        //          ownerBal = await BusdToken.balanceOf(owner.address);
        //          addr1Bal = await BusdToken.balanceOf(addr1.address);
        //          addr2Bal = await BusdToken.balanceOf(addr2.address);
        //          addr3Bal = await BusdToken.balanceOf(addr3.address);
        //          addr4Bal = await BusdToken.balanceOf(addr4.address);
        //          cpTokenAddrBal = await BusdToken.balanceOf(cpTokenAddr.address);
        //          tbTokenAddrBal = await BusdToken.balanceOf(tbTokenAddr.address);
        //          ppAddrBal = await BusdToken.balanceOf(ppAddr.address);
        //          daoAddrBal = await BusdToken.balanceOf(daoAddr.address);
        //          influAddrBal = await BusdToken.balanceOf(influAddr.address);
        //          RewardBal = await BusdToken.balanceOf(Reward.address);
        //     }


        //     await Reward.connect(addr1).purchaseNFT(1 , addr1.address , {value: 100 * 10 ** decimals});
        //     await output();
        //     // console.log(await Reward.connect(addr1).sample({from : owner.address}));

        //     await Reward.connect(addr1).purchaseNFT(2 , addr1.address , {value: 200 * 10 ** decimals});
        //     await output();


        //     await Reward.connect(addr2).purchaseNFT(1 , addr2.address , {value: 100 * 10 ** decimals});
        //     await output();


        //     await Reward.connect(addr3).purchaseNFT(1 , addr3.address , {value: 100 * 10 ** decimals});
        //     await output();

        //     await time.increase(3600 * 24 * 31);

        //     console.log("\n\n a month passed \n\n");
        //     await Reward.connect(addr4).purchaseNFT(1 , addr4.address , {value: 100 * 10 ** decimals});
        //     await output();

        //     await Reward.connect(addr4).purchaseNFT(2 , addr4.address , {value: 200 * 10 ** decimals});
        //     await output();

        //     await Reward.connect(addr4).purchaseNFT(3 , addr4.address , {value: 400 * 10 ** decimals});
        //     await output();

        //     await Reward.connect(addr4).purchaseNFT(4 , addr4.address , {value: 800 * 10 ** decimals});
        //     await output();


        //     await time.increase(3600 * 24 * 31);

        //     await Reward.connect(addr3).purchaseNFT(2 , addr3.address , {value: 200 * 10 ** decimals});
        //     await output();

        //     await Reward.connect(addr1).claimClapAndTribalToken();
        //     console.log(await ClapToken.balanceOf(addr1.address));
        //     console.log(await TribalToken.balanceOf(addr1.address));
        // });

        it("addPerson function test" , async () => {
            const {
                Reward ,
                BusdToken ,
                ClapToken ,
                TribalToken ,
                owner ,
                addr1 ,
                addr2 ,
                addr3 ,
                addr4 ,
                cpTokenAddr,
                tbTokenAddr ,
                ppAddr ,
                daoAddr,
                influAddr ,
            } = await loadFixture(deployTokenFixture);

            const decimals = 5;
            await BusdToken.mint(addr1.address , 1000 * 10 ** decimals);
            await BusdToken.connect(addr1).approve(Reward.address , 300 * 10 **decimals);

            await Reward.connect(addr1).addPerson(owner.address);

            await expect(Reward.connect(addr2).addPerson(addr1.address)).to.be.revertedWith(
                'only owned at least one collection can invite you'
            );

            await Reward.connect(addr1).purchaseNFT(1 , addr1.address , {value: 100 * 10 ** decimals});
            await Reward.connect(addr2).addPerson(addr1.address);

        });
    });


    // it("Deployment" , async () => {

    //     const {Reward , BusdToken , ClapToken , TribalToken , owner , addr1 , addr2} = await loadFixture(deployTokenFixture);
    //     console.log(Reward.address , owner.address);

    //     await BusdToken.mint(owner.address , 10000);
    //     await ClapToken.mint(owner.address , 10000);
    //     await TribalToken.mint(owner.address , 10000);

    //     console.log(await BusdToken.balanceOf(owner.address) , await BusdToken.totalSupply());

    //     await BusdToken.transfer(addr1.address , 50);

    //     console.log(await BusdToken.balanceOf(owner.address) , await BusdToken.balanceOf(addr1.address) );

    //     await Reward.connect(addr1).addPerson(owner.address);

    //     await Reward.setRewardBoxPrice(500 , 2);

    //     await expect(Reward.purchaseNFT(2 , owner.address , {value: 500})).to.be.revertedWith("you can not purchase this Box");



        // let NFT = [];
        // let collections = ["First" , "Second" , "Third" , "Fourth" , "Fifth" , "Sixth" , "Seventh" , "Eightth"]

        // for(let i = 1; i< 9; i++){

        //     NFT[i] = await DefincubatorNFT.deploy(
        //         `${collections[i]} Collection`,
        //         `${collections[i]}C`,
        //         i,
        //         "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/",
        //         Reward.address
        //     );

        //     console.log(NFT[i].address);
        // }




    // });

    // it("all of addresses get some tokens of BUSD" , async () => {
    //     const [owner , addr1 , addr2 , add3] = await ethers.getSigners();

    //     const Token = await ethers.getContractFactory("Token");
    //     const BusdToken = await Token.deploy("Binanace" , "BUSD");

    //     await BusdToken.mint(owner.address , 10000);
    //     await BusdToken.mint(addr1.address , 30000);
    //     await BusdToken.mint(addr2.address , 50000);

    //     expect( await BusdToken.balanceOf(owner.address)).to.equal(10000);
    //     expect( await BusdToken.balanceOf(addr1.address)).to.equal(30000);
    //     expect( await BusdToken.balanceOf(addr2.address)).to.equal(50000);
    // });

    // it("add Person function test" , async () => {
    //     const {Reward , BusdToken , ClapToken , TribalToken , owner , addr1 , addr2} = await loadFixture(deployTokenFixture);
    //     await Reward.connect(addr1).addPerson(addr2.address);
    //     expect(await Reward.invitedBy(addr1.address)).to.equal(addr2.address);

    // });


    // it("check superPromoter Level" , async () => {
    //     const {Reward , BusdToken , ClapToken , TribalToken , owner , addr1 , addr2 ,addr3 , addr4 , addr5 ,addr6 , addr7 , addr8 , addr9} = await loadFixture(deployTokenFixture);
    //     const decimals = 5;
    //     await BusdToken.mint(owner.address , 100 * (10**decimals));
    //     await ClapToken.mint(owner.address , 100* (10**decimals));
    //     await TribalToken.mint(owner.address , 100* (10**decimals));


    //     await BusdToken.mint(addr1.address , 10000* (10**decimals));
    //     await BusdToken.mint(addr2.address , 10000* (10**decimals));

    //     await Reward.connect(addr1).addPerson(owner.address);
    //     await Reward.connect(addr2).addPerson(owner.address);
    //     // await Reward.connect(owner).addPerson(0);

    //     await Reward.setAddresses(
    //         BusdToken.address,
    //         addr4.address,
    //         ClapToken.address,
    //         addr5.address,
    //         TribalToken.address,
    //         addr6.address,
    //         addr7.address,
    //         addr8.address,
    //         addr9.address
    //     );

    //     await Reward.setRewardBoxPrice(100 , 1);
    //     await Reward.setRewardBoxPrice(200 , 2);
    //     await Reward.setRewardBoxPrice(400 , 3);
    //     await Reward.setRewardBoxPrice(800 , 4);
    //     await Reward.setRewardBoxPrice(1600 , 5);
    //     await Reward.setRewardBoxPrice(3200 , 6);
    //     await Reward.setRewardBoxPrice(6400 , 7);
    //     await Reward.setRewardBoxPrice(12800 , 8);

    //     await Reward.setBoxReward(3000 , 1);
    //     await Reward.setBoxReward(4000 , 2);
    //     await Reward.setBoxReward(5000 , 3);
    //     await Reward.setBoxReward(6000 , 4);
    //     await Reward.setBoxReward(7000 , 5);
    //     await Reward.setBoxReward(8000 , 6);
    //     await Reward.setBoxReward(9000 , 7);
    //     await Reward.setBoxReward(10000 , 8);

    //     await Reward.setTokenMaxReward(50 , 250);
    //     await Reward.setRewardPeriod(10);

    //     await Reward.setFriendChainRewardRate(1000 , 1);
    //     await Reward.setFriendChainRewardRate(500 , 2);
    //     await Reward.setFriendChainRewardRate(500 , 3);
    //     await Reward.setFriendChainRewardRate(500 , 4);
    //     await Reward.setFriendChainRewardRate(500 , 5);

    //     await Reward.setPoolValue(500 , 50 , 12);
    //     await Reward.setPromoterValue(200,300,6,12,250,500);
    //     await Reward.setOtherRewardRates(1250,1250,2500,500,1000);
    //     await Reward.setSuperPromoterRewardRate(200,300);



    //     await BusdToken.mint(Reward.address , 1000* (10**decimals));
    //     await ClapToken.mint(Reward.address , 1000* (10**decimals));
    //     await TribalToken.mint(Reward.address , 1000* (10**decimals));


    //     console.log(await BusdToken.balanceOf(Reward.address));
    //     await BusdToken.connect(addr1).transfer(Reward.address , 100* (10**decimals));
    //     await Reward.connect(addr1).purchaseNFT(1 , addr1.address , {value: 100* (10**decimals)});

    //     console.log(await BusdToken.balanceOf(Reward.address) , "BUSD--Contract Balance");
    //     console.log(await BusdToken.balanceOf(owner.address) , "BUSD--Owner Balance");
    //     console.log(await BusdToken.balanceOf(addr1.address) , "BUSD--addr1 Balance");
    //     console.log(await BusdToken.balanceOf(addr4.address) , "BUSD--addr4 Balance");
    //     console.log(await BusdToken.balanceOf(addr5.address) , "BUSD--addr5 Balance");
    //     console.log(await BusdToken.balanceOf(addr6.address) , "BUSD--addr6 Balance");
    //     console.log(await BusdToken.balanceOf(addr7.address) , "BUSD--addr7--performanace Balance");
    //     console.log(await BusdToken.balanceOf(addr8.address) , "BUSD--addr8--dao Balance");
    //     console.log(await BusdToken.balanceOf(addr9.address) , "BUSD--addr9--influence Balance");

    //     console.log(await ClapToken.balanceOf(Reward.address) , "Clap--Contract Balance");
    //     console.log(await ClapToken.balanceOf(owner.address) , "Clap--Owner Balance");
    //     console.log(await ClapToken.balanceOf(addr1.address) , "Clap--addr1 Balance");
    //     console.log(await ClapToken.balanceOf(addr3.address) , "Clap--addr3 Balance");

    //     console.log(await TribalToken.balanceOf(Reward.address) , "Tribal--Contract Balance");
    //     console.log(await TribalToken.balanceOf(owner.address) , "Tribal--Owner Balance");
    //     console.log(await TribalToken.balanceOf(addr1.address) , "Tribal--addr1 Balance");
    //     console.log(await TribalToken.balanceOf(addr3.address) , "Tribal--addr3 Balance");

    //     console.log(await Reward.persons(owner.address));
    //     console.log(await Reward.persons(addr1.address));
    //     console.log(await Reward.invitedBy(owner.address));
    //     console.log(await Reward.invitedBy(addr1.address));


    //     await BusdToken.connect(addr1).transfer(Reward.address , 200* (10**decimals));
    //     await Reward.connect(addr1).purchaseNFT(2 , addr1.address , {value: 200* (10**decimals)});


    //     await BusdToken.connect(addr2).transfer(Reward.address , 100* (10**decimals));
    //     await Reward.connect(addr2).purchaseNFT(1 , addr2.address , {value: 100* (10**decimals)})

    //     await BusdToken.connect(addr2).transfer(Reward.address , 200* (10**decimals));
    //     await Reward.connect(addr2).purchaseNFT(2 , addr2.address , {value: 200* (10**decimals)})


    //     console.log(await Reward.persons(addr1.address));

    //     await time.increase(3600 * 24 * 7 * 3);

    //     console.log(await Reward.persons(owner.address));
    //     console.log(await Reward.persons(addr1.address));
    //     console.log(await Reward.persons(addr2.address));


    //     console.log(await Reward.persons(addr1.address));
    //     console.log(await ClapToken.balanceOf(addr1.address) , "Clap--addr1 Balance");
    //     console.log(await TribalToken.balanceOf(addr1.address) , "Tribal--addr1 Balance");


    //     await Reward.connect(addr1).claim();

    //     console.log(await Reward.persons(addr1.address));
    //     console.log(await ClapToken.balanceOf(addr1.address) , "Clap--addr1 Balance");
    //     console.log(await TribalToken.balanceOf(addr1.address) , "Tribal--addr1 Balance");

        // console.log(await Reward.rewardBoxPrice(1));
        // await Reward.connect(addr1).purchaseNFT(2 , addr1.address , {value: 200});
        // await Reward.connect(addr2).purchaseNFT(1 , addr2.address , {value: 100});

        // expect(await Reward.persons[owner.address].superPromoterLevel).to.equal(1);


    // });

});
