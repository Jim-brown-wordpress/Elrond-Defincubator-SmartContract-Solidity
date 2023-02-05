//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./others/BokkyPooBahsDateTimeLibrary.sol";

// import "./DefincubatorNFT.sol";
// import "./interfaces/IDefincubatorNFT.sol";

contract RewardDefincubator {

    // ------------ Other Contracts----------------- //

    IDefincubatorNFT[] private nftContracts;

    IERC20 private  BUSDContract;
    address private  BUSDAddress;

    IERC20 private  CLAPContract;
    address private  CLAPAddress;

    IERC20 private  TribalContract;
    address private  TribalAddress;

    // ------------------------------ //

    struct Box {
        uint256 boxNumber;
        uint256 earnedAt;
    }

    struct Person{
        uint256 ownedBoxLastIndex;
        mapping(uint256 => Box) rewardBox;

        uint256 superPromoterLevel;
        // NFT balance
        uint256 clapBalance;
        uint256 tribalBalance;
        uint256 busdBalance;
        //
        // uint256 claimableClapRewards;
        // uint256 claimedClapRewards;
        //
        // uint256 claimableTribalRewards;
        // uint256 claimedTribalRewards;
        //
        // uint256 startedAt;
        uint256 lastClaimedAt;
    }
    mapping(address => Person) private persons;
    mapping(address => address) invitedBy;

    // struct NFTMarketItem{
    //     uint256 nftId;
    //     uint256 price;
    //     address[] generationOwnerships;
    //     uint256 generationIndex;
    //     bool sold;
    // }


    // mapping(uint256 => NFTMarketItem) private marketItem;

    mapping(uint256 => uint256) private rewardBoxPrice;
    mapping(uint256 => uint256) private boxReward;

    address payable private contractOwner;
    address payable private performancePoolAddress;
    address payable private influenceAddress;
    // address private NFTAddress;


    uint256 clapTokenTotalReward;
    uint256 tribalTokenTotalReward;

    uint256 rewardPeriod;

    uint256[] friendChainRewardRate;

    uint256 poolRewardRate;
    uint256 poolQ_price;
    uint256 poolQ_time;

    uint256 promoter1Rate;
    uint256 promoter2Rate;

    uint256 promoter1Q_time;
    uint256 promoter2Q_time;

    uint256 promoter1Q_price;
    uint256 promoter2Q_price;

    address daoTreasureAddress;
    uint256 constant boxN = 8;

    // uint256 private poolProfitPercent;

    // using Counters for Counters.Counter;
    // Counters.Counter private _listedTokenIds;

    //// -----------
    // uint256 private salesFee;
    ////


    constructor(
        address _contractOwner,

        address _NFTAddress1,
        address _NFTAddress2,
        address _NFTAddress3,
        address _NFTAddress4,
        address _NFTAddress5,
        address _NFTAddress6,
        address _NFTAddress7,
        address _NFTAddress8,

        address _BUSDAddress,
        address _CLAPAddress,
        address _TRIBALAddress,

        // < !----- NFT Collection packages and rewards. > //

        uint256 _box1RewardRate,
        uint256 _box2RewardRate,
        uint256 _box3RewardRate,
        uint256 _box4RewardRate,
        uint256 _box5RewardRate,
        uint256 _box6RewardRate,
        uint256 _box7RewardRate,
        uint256 _box8RewardRate,

        uint256 _box1Price,
        uint256 _box2Price,
        uint256 _box3Price,
        uint256 _box4Price,
        uint256 _box5Price,
        uint256 _box6Price,
        uint256 _box7Price,
        uint256 _box8Price,

        uint256 _clapTokenTotalReward,
        uint256 _tribalTokenTotalReward,

        uint256 _rewardPeriod,

        // <!----- END > //


        // < !----- 5 generation rewards. > //

        uint256 _firstChainRewardRate,
        uint256 _secondChainRewardRate,
        uint256 _thirdChainRewardRate,
        uint256 _fourthChainRewardRate,
        uint256 _fifthChainRewardRate,

        // <!----- END > //

        // < !----- Pool Rewards. > //

        uint256 _poolRewardRate,
        uint256 _poolQ_price,
        uint256 _poolQ_time,

        // <!----- END > //

        // < !----- Infinity rewards. > //

        uint256 _promoter1Rate,
        uint256 _promoter2Rate,

        uint256 _promoter1Q_time,
        uint256 _promoter2Q_time,

        uint256 _promoter1Q_price,
        uint256 _promoter2Q_price,

        // <!----- END > //

        address _daoTreasureAddress

    ) {
        contractOwner = payable(_contractOwner);

        nftContracts = new IDefincubatorNFT[](8);
        nftContracts[0] = IDefincubatorNFT(_NFTAddress1);
        nftContracts[1] = IDefincubatorNFT(_NFTAddress2);
        nftContracts[2] = IDefincubatorNFT(_NFTAddress3);
        nftContracts[3] = IDefincubatorNFT(_NFTAddress4);
        nftContracts[4] = IDefincubatorNFT(_NFTAddress5);
        nftContracts[5] = IDefincubatorNFT(_NFTAddress6);
        nftContracts[6] = IDefincubatorNFT(_NFTAddress7);
        nftContracts[7] = IDefincubatorNFT(_NFTAddress8);
        // NFTAddress = _NFTAddress;

        rewardBoxPrice[1] = _box1Price;
        rewardBoxPrice[2] = _box2Price;
        rewardBoxPrice[3] = _box3Price;
        rewardBoxPrice[4] = _box4Price;
        rewardBoxPrice[5] = _box5Price;
        rewardBoxPrice[6] = _box6Price;
        rewardBoxPrice[7] = _box7Price;
        rewardBoxPrice[8] = _box8Price;

        boxReward[1] = _box1RewardRate;
        boxReward[2] = _box2RewardRate;
        boxReward[3] = _box3RewardRate;
        boxReward[4] = _box4RewardRate;
        boxReward[5] = _box5RewardRate;
        boxReward[6] = _box6RewardRate;
        boxReward[7] = _box7RewardRate;
        boxReward[8] = _box8RewardRate;


        BUSDAddress = _BUSDAddress;
        BUSDContract = IERC20(BUSDAddress);

        CLAPAddress = _CLAPAddress;
        CLAPContract = IERC20(CLAPAddress);

        TribalAddress = _TRIBALAddress;
        TribalContract = IERC20(TribalAddress);

        clapTokenTotalReward = _clapTokenTotalReward;
        tribalTokenTotalReward = _tribalTokenTotalReward;

        rewardPeriod = _rewardPeriod * 1 days;

        friendChainRewardRate = new uint256[](5);
        friendChainRewardRate[0] = _firstChainRewardRate;
        friendChainRewardRate[1] = _secondChainRewardRate;
        friendChainRewardRate[2] = _thirdChainRewardRate;
        friendChainRewardRate[3] = _fourthChainRewardRate;
        friendChainRewardRate[4] = _fifthChainRewardRate;

        poolRewardRate = _poolRewardRate;
        poolQ_price = _poolQ_price;
        poolQ_time = _poolQ_time * 1 days;

        promoter1Rate = _promoter1Rate;
        promoter2Rate = _promoter2Rate;

        promoter1Q_time = _promoter1Q_time* 1 days;
        promoter2Q_time = _promoter2Q_time* 1 days;

        promoter1Q_price = _promoter1Q_price;
        promoter2Q_price = _promoter2Q_price;

        daoTreasureAddress = _daoTreasureAddress;
    }

    modifier onlyOwner {
        require(msg.sender == contractOwner , "Not authorized");
        _;
    }

    //-------------------- Change Stroage Variables ----------------------------//


    function changeContractOwner(address newOwner) external onlyOwner {
        contractOwner = payable(newOwner);
    }

    function changeBUSDAddress(address newBUSDAddress) external onlyOwner {
        BUSDAddress = newBUSDAddress;
        BUSDContract = IERC20(BUSDAddress);
    }

    function changeCLAPAddress(address newCLAPAddress) external onlyOwner {
        CLAPAddress = newCLAPAddress;
        CLAPContract = IERC20(CLAPAddress);
    }

    function changeTribalAddress(address newTribalAddress) external onlyOwner {
        TribalAddress = newTribalAddress;
        TribalContract = IERC20(TribalAddress);
    }

    function changeNftContractAddress(address newNftContractAddress , uint256 index) external onlyOwner {
        nftContracts[index - 1] = IDefincubatorNFT(newNftContractAddress);
    }

    function changeRewardBoxPrice(uint256 newRewardBoxPrice , uint256 index) external onlyOwner {
        rewardBoxPrice[index - 1] = newRewardBoxPrice;
    }

    function changeBoxReward(uint256 newBoxReward , uint256 index) external onlyOwner {
        boxReward[index - 1] = newBoxReward;
    }

    function changePerformancePoolAddress(address newPerformancePoolAddress) external onlyOwner {
        performancePoolAddress = payable(newPerformancePoolAddress);
    }

    function changeClapTokenTotalReward(uint256 newClapTokenTotalReward) external {
        clapTokenTotalReward = newClapTokenTotalReward;
    }

    function changeTribalTokenTotalReward(uint256 newTribalTokenTotalReward) external onlyOwner {
        tribalTokenTotalReward = newTribalTokenTotalReward;
    }

    function changeRewardPeroid(uint256 newRewardPeriod) external onlyOwner {
        rewardPeriod = newRewardPeriod * 1 days;
    }

    function changeFriendChainRewardRate(uint256 newFriendChainRewardRate , uint256 index) external onlyOwner {
        friendChainRewardRate[index - 1] = newFriendChainRewardRate;
    }

    function changePoolRewardRate(uint256 newPoolRewardRate) external onlyOwner {
        poolRewardRate = newPoolRewardRate;
    }

    function changePoolQ_price(uint256 newPoolQ_price) external onlyOwner {
        poolQ_price = newPoolQ_price;
    }

    function changePoolQ_time(uint256 newPoolQ_time) external onlyOwner {
        poolQ_time = newPoolQ_time * 1 days;
    }

    function changePromoter1Rate(uint256 newPromoter1Rate) external onlyOwner {
        promoter1Rate = newPromoter1Rate;
    }

    function changePromoter2Rate(uint256 newPromoter2Rate) external onlyOwner {
        promoter2Rate = newPromoter2Rate;
    }

    function changePromoter1Q_time(uint256 newPromoter1Q_time) external onlyOwner {
        promoter1Q_time = newPromoter1Q_time * 1 days;
    }

    function changePromoter2Q_time(uint256 newPromoter2Q_time) external onlyOwner {
        promoter2Q_time = newPromoter2Q_time * 1 days;
    }

    function changePromoter1Q_price(uint256 newPromoter1Q_price) external onlyOwner {
        promoter1Q_price = newPromoter1Q_price;
    }

    function changePromoter2Q_price(uint256 newPromoter2Q_price) external onlyOwner {
        promoter2Q_price = newPromoter2Q_price;
    }

    function changeDaoTreasureAddress(address newDaoTreasureAddress) external onlyOwner {
        daoTreasureAddress = newDaoTreasureAddress;
    }
    //-------------------- -------------------------- ----------------------------//


    //-------------------- Get Stroage Variables ----------------------------//


    function getContractOwner() external view returns (address){
        return contractOwner;
    }

    function getBUSDAddress() external view returns (address){
        return BUSDAddress;
    }

    function getCLAPAddress() external view returns (address){
        return CLAPAddress;
    }

    function getTribalAddress() external view returns (address){
        return TribalAddress;
    }

    // function getNftContractAddress(uint256 index) external view returns (address){
    // }

    function getRewardBoxPrice(uint256 index) external view returns (uint256){
        return rewardBoxPrice[index - 1];
    }

    function getBoxReward(uint256 index) external view returns (uint256){
        return boxReward[index - 1];
    }

    function getPerformancePoolAddress() external view returns (address){
        return performancePoolAddress;
    }

    function getClapTokenTotalReward() external view returns (uint256) {
        return clapTokenTotalReward;
    }

    function getTribalTokenTotalReward() external view returns (uint256){
        return tribalTokenTotalReward;
    }

    function getRewardPeroid() external view returns (uint256){
        return rewardPeriod;
    }

    function getFriendChainRewardRate(uint256 index) external view returns (uint256){
        return friendChainRewardRate[index - 1];
    }

    function getPoolRewardRate() external view returns (uint256){
        return poolRewardRate;
    }

    function getPoolQ_price() external view returns (uint256){
        return poolQ_price;
    }

    function getPoolQ_time() external view returns (uint256){
        return poolQ_time;
    }

    function getPromoter1Rate() external view returns (uint256){
        return promoter1Rate;
    }

    function getPromoter2Rate() external view returns (uint256){
        return promoter2Rate;
    }

    function getPromoter1Q_time() external view returns (uint256){
        return promoter1Q_time;
    }

    function getPromoter2Q_time() external view returns (uint256){
        return promoter2Q_time;
    }

    function getPromoter1Q_price() external view returns (uint256){
        return promoter1Q_price;
    }

    function getPromoter2Q_price() external view returns (uint256){
        return promoter2Q_price;
    }

    function getDaoTreasureAddress() external view returns (address){
        return daoTreasureAddress;
    }

    //-------------------- -------------------------- ----------------------------//


    function purchaseRewardBox(uint256 index) external payable {
        require(msg.value >= rewardBoxPrice[index - 1] , "balance not enough to buy");
        Person storage person = persons[msg.sender];
        require(person.ownedBoxLastIndex == index - 1 , "you can not purchase this Box");

        person.ownedBoxLastIndex = index;
        person.rewardBox[index] = Box(index , block.timestamp);

        BUSDContract.transferFrom(msg.sender, CLAPAddress, msg.value * 1250 / 10000 );
        BUSDContract.transferFrom(msg.sender, TribalAddress, msg.value * 1250 / 10000 );
        BUSDContract.transferFrom(msg.sender, daoTreasureAddress, msg.value * 2500 / 10000 );

        address parent;
        parent = invitedBy[msg.sender];
        if(parent != address(0))
            BUSDContract.transferFrom(msg.sender, parent, msg.value * 1000 / 10000 );
        for(uint i = 1 ;i < 5; i++){
            parent = invitedBy[parent];
            if(parent == address(0))
                break;
            BUSDContract.transferFrom(msg.sender, parent, msg.value * 500 / 10000 );
        }

        BUSDContract.transferFrom(msg.sender, performancePoolAddress, msg.value * 500 / 10000 );
        BUSDContract.transferFrom(msg.sender, influenceAddress, msg.value * 1000 / 10000 );
        if(person.superPromoterLevel == 1){
            BUSDContract.transferFrom(msg.sender, performancePoolAddress, msg.value * 200 / 10000 );
            BUSDContract.transferFrom(msg.sender, contractOwner, msg.value * 300 / 10000 );
        }
        else if (person.superPromoterLevel == 2){
            BUSDContract.transferFrom(msg.sender, performancePoolAddress, msg.value * 500 / 10000 );
        }
    }

    function setInvitedBy(address to) external {
        require(invitedBy[msg.sender] == address(0) , "someone has already invited you");
        invitedBy[msg.sender] = to;

    }

    // function calculateReward(address owner) internal pure returns (uint256) {
    //     return 0;
    // }

    function claim() external {
        Person storage person = persons[msg.sender];

        uint256 nweeks = (block.timestamp - person.lastClaimedAt) / 1 weeks;

        for(uint i = 0 ; i< 8 ;i++){
            if( (block.timestamp - person.rewardBox[i].earnedAt) / 1 weeks <= 12 ) {

                CLAPContract.transferFrom(CLAPAddress, msg.sender, nweeks * (50 * 1e18) /12);
                CLAPContract.transferFrom(CLAPAddress, msg.sender, nweeks * (50 * 1e18) /12);
            }
        }


        person.lastClaimedAt = person.lastClaimedAt + nweeks * 1 weeks;
    }


}
