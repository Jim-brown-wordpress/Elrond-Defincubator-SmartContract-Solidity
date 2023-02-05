// const {expect , assert} = require('chai');
// const hre = require('hardhat');

// describe("mint funtion testing" , function(){
//     it("mint should be correct" , async function(){
//         const DefincubatorNFT = await hre.ethers.getContractFactory("DefincubatorNFT");
//         const defincubatorNFT = await DefincubatorNFT.deploy("DefincubatorNFT" , "Def");

//         await defincubatorNFT.deployed();

//         let txn = await defincubatorNFT.createDefincubatorNFT("bbb");
//         let tx = await txn.wait();

//         event = tx.events[0];
//         value = event.args[2];

//         assert.equal(value.toNumber() , 0);
//     });
// })


const {
    time , loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");

const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const { ethers } = require("hardhat");


describe("Token contract" , function(){

    it("Deployment should assign the total supply of tokens of tokens to the owner" , async () => {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const BusdToken = await Token.deploy("Banance USD" , "BUSD");
        const ownerBalance = await BusdToken.balanceOf(owner.address);
        expect(await BusdToken.totalSupply()).to.equal(ownerBalance);
    });

});



describe("DefincubatorReward Token Contract" , function(){

    async function deployTokenFixture(){

        const [owner , addr1 , addr2] = await ethers.getSigners();

        const DefincubatorReward = await ethers.getContractFactory("DefincubatorReward");
        const Token = await ethers.getContractFactory("Token");

        const Reward = await DefincubatorReward.deploy();

        const BusdToken = await Token.deploy("Binance USD" , "BUSD");
        const ClapToken = await Token.deploy("Clap USD" , "CLAP");
        const TribalToken = await Token.deploy("Tribal USD" , "TRIBAL");


        return {Reward , BusdToken , ClapToken , TribalToken , owner , addr1 , addr2}
    }

    it("Deployment" , async () => {

        const {Reward , BusdToken , ClapToken , TribalToken , owner , addr1 , addr2} = await loadFixture(deployTokenFixture);
        console.log(Reward.address , owner.address);

        await BusdToken.mint(owner.address , 10000);
        await ClapToken.mint(owner.address , 10000);
        await TribalToken.mint(owner.address , 10000);

        console.log(await BusdToken.balanceOf(owner.address) , await BusdToken.totalSupply());

        await BusdToken.transfer(addr1.address , 50);

        console.log(await BusdToken.balanceOf(owner.address) , await BusdToken.balanceOf(addr1.address) );

        await Reward.connect(addr1).addPerson(owner.address);

        await Reward.setRewardBoxPrice(500 , 2);

        await expect(Reward.purchaseNFT(2 , owner.address , {value: 500})).to.be.revertedWith("you can not purchase this Box");




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




    });

});
