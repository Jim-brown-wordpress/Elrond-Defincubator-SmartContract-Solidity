const { ethers } = require("hardhat")

const main = async () => {
    const DefincubatorNFT = await ethers.getContractFactory("DefincubatorNFT");
    const defincubatorNFT = await DefincubatorNFT.deploy(
        "Nex1" ,
        "Nex1",
        1,
        "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/",
        "0x4e6BA25AA573197598B1B69Fb308b5cf8D3ae3Bb"
    );
    defincubatorNFT.deployed();


    console.log("Contract is deployed to:" , defincubatorNFT.address);
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
