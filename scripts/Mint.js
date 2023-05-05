const { ethers } = require("hardhat");
const {BigNumber} = require('ethers');

////////////////////////////
//////// PARAMETER /////////
////////////////////////////

const busdTokenContractAddress = '0xD3Dbd09e0E0aF59cd25e6dC19D33448215A74901';
const toAddress = '0xC3Adb5247f26dfe050Aa7F3c265F76B0ec323c3e';
const mintValue = BigNumber.from('99999'+'000000000000000000');

////////////////////////////
////////////////////////////
////////////////////////////


const main = async () => {

    const Token = await ethers.getContractFactory("Token");
    const BusdTokenContract = await Token.attach(busdTokenContractAddress);

    await BusdTokenContract.mint(toAddress , mintValue);

    console.log(
        `
            ----------<result>--------
            busd balance of toAddress is ${await BusdTokenContract.balanceOf(toAddress)}
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
