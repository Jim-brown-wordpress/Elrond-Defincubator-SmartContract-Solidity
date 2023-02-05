//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./others/BokkyPooBahsDateTimeLibrary.sol";


contract DefincubatorReward{
    /*------------------- Mint State  --------------------

    ----------------------------------------------------*/
    using Counters for Counters.Counter;
    Counters.Counter public _tokenId;

    mapping(uint256 => uint256) tokenIdToCollectionIndex;
    mapping(uint256 => uint256) tokenIdToCollectionId;
    mapping(uint256 => uint256) mintedTokenLByCollection;

    address contractOwner;

    mapping(uint256 => string) public pinataURL;
    uint256 public nCollection;


    /*---------------------------------------------------

    ---------------------------------------------------*/



    /*-----------------Reward State-----------------------

    ---------------------------------------------------*/


    address BusdContractAddress;
    address BusdTokenAddress;

    address ClapContractAddress;
    address ClapTokenAddress;

    address TribalContractAddress;
    address TribalTokenAddress;


    struct Person{

        uint256 ownedBoxLastIndex;
        uint256[] earnedRewardBoxAt;

        uint256 superPromoterLevel;
        uint256 getQAt;
        uint256 getQAmount;

        uint256 clapBalance;
        uint256 tribalBalance;
        uint256 busdBalance;

        uint256 lastClaimedAt;
    }

    uint256 nPerson;
    mapping(uint256 => address) addresses;
    mapping(address => Person) private persons;
    mapping(address => address) invitedBy;

    mapping(uint256 => uint256) private rewardBoxPrice;
    mapping(uint256 => uint256) private boxReward;

    address private performancePoolAddress;
    address private influenceAddress;
    address daoTreasureAddress;

    uint256 clapTokenMaxReward;
    uint256 tribalTokenMaxReward;

    uint256 rewardPeriod;


    uint256 poolRewardRate;
    uint256 poolQ_price;
    uint256 poolQ_time;

    uint256 promoter1Rate;
    uint256 promoter2Rate;

    uint256 promoter1Q_time;
    uint256 promoter2Q_time;

    uint256 promoter1Q_price;
    uint256 promoter2Q_price;

    /*---------------------------------------------------

    ---------------------------------------------------*/
    uint256 clapTokenRewardRate;
    uint256 tribalTokenRewardRate;
    uint256 daoTreasureRewardRate;
    uint256 performancePoolRewardRate;
    uint256 influenceRewardRate;
    uint256 superPromoter1RewardRate;
    uint256 superPromoter2RewardRate;

    uint256 generations;
    mapping(uint256 => uint256) friendChainRewardRate;

    constructor(

        // address _BusdContractAddress,
        // address _BusdTokenAddress,
        // address _ClapContractAddress,
        // address _ClapTokenAddress,
        // address _TribalContractAddress,
        // address _TribalTokenAddress,
        // address _daoTreasureAddress,

        // uint256[] memory _boxRewardRate,
        // uint256[] memory _boxPrice,

        // uint256 _clapTokenMaxReward,
        // uint256 _tribalTokenMaxReward,

        // uint256 _rewardPeriod,

        // uint256 _generations,
        // uint256[] memory _friendChainRewardRate,

        // uint256 _poolRewardRate,
        // uint256 _poolQ_price,
        // uint256 _poolQ_time,

        // uint256 _promoter1Rate,
        // uint256 _promoter2Rate,

        // uint256 _promoter1Q_time,
        // uint256 _promoter2Q_time,

        // uint256 _promoter1Q_price,
        // uint256 _promoter2Q_price,

        // uint256 _clapTokenRewardRate,
        // uint256 _tribalTokenRewardRate,
        // uint256 _daoTreasureRewardRate,
        // uint256 _performancePoolRewardRate,
        // uint256 _influenceRewardRate,
        // uint256 _superPromoter1RewardRate,
        // uint256 _superPromoter2RewardRate

    ){
        contractOwner = msg.sender;


        nCollection = 8;
        pinataURL[1] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[2] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[3] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[4] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[5] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[6] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[7] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
        // pinataURL[8] = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";

        // for(uint256 i = 1; i <= nCollection; i++){
        //     rewardBoxPrice[i] = _boxPrice[i];
        //     boxReward[i] = _boxRewardRate[i];
        // }

        // for(uint256 i = 0; i < 5; i++){
        //     rewardBoxPrice[i] = _boxPrice[i];
        //     boxReward[i] = _boxRewardRate[i];
        // }

        // generations = _generations;
        // for(uint256 i = 0; i < generations; i++){
        //     friendChainRewardRate[i] = _friendChainRewardRate[i];
        // }

        // BusdContractAddress = _BusdContractAddress;
        // BusdTokenAddress = _BusdTokenAddress;
        // ClapContractAddress = _ClapContractAddress;
        // ClapTokenAddress = _ClapTokenAddress;
        // TribalContractAddress = _TribalContractAddress;
        // TribalTokenAddress = _TribalTokenAddress;
        // daoTreasureAddress = _daoTreasureAddress;

        // clapTokenMaxReward = _clapTokenMaxReward;
        // tribalTokenMaxReward = _tribalTokenMaxReward;

        // rewardPeriod = _rewardPeriod;

        // poolRewardRate = _poolRewardRate;
        // poolQ_price = _poolQ_price;
        // poolQ_time = _poolQ_time;

        // promoter1Rate = _promoter1Rate;
        // promoter2Rate = _promoter2Rate;

        // promoter1Q_time = _promoter1Q_time;
        // promoter2Q_time = _promoter2Q_time;

        // _promoter1Q_price = _promoter1Q_price;
        // _promoter2Q_price = _promoter2Q_price;

        // clapTokenRewardRate = _clapTokenRewardRate;
        // tribalTokenRewardRate = _tribalTokenRewardRate;
        // daoTreasureRewardRate = _daoTreasureRewardRate;
        // performancePoolRewardRate = _performancePoolRewardRate;
        // influenceRewardRate = _influenceRewardRate;
        // superPromoter1RewardRate = _superPromoter1RewardRate;
        // superPromoter2RewardRate = _superPromoter2RewardRate;
    }

    modifier onlyOwner {
        require(msg.sender == contractOwner);
        _;
    }

    /*------------------- Mint Part  --------------------

    ----------------------------------------------------*/
    function setPinataURL(
            uint256 collectionIndex ,
            string memory _pinataURL
        ) external onlyOwner {
            pinataURL[collectionIndex] = _pinataURL;
        }

    // function addPinataURL(
    //         string memory _pinataURL
    //     ) external onlyOwner {
    //         nCollection++;
    //         pinataURL[nCollection] = _pinataURL;
    //     }

    // function removePinataURL()
    //     external onlyOwner {
    //         pinataURL[nCollection] = "";
    //         nCollection--;
    //     }

    function purchaseNFT(
            uint256 collectionIndex,
            address owner
        )
        external payable{

            require(msg.value == rewardBoxPrice[collectionIndex] , "balance not enough to buy");
            Person storage person = persons[owner];
            require(person.ownedBoxLastIndex == collectionIndex - 1 , "you can not purchase this Box");

            // ------------ Reward ------------------
            person.ownedBoxLastIndex = collectionIndex;
            person.earnedRewardBoxAt[collectionIndex] = block.timestamp;

            uint256 remaingRewardRate = 10000;

            IERC20(BusdContractAddress).transferFrom(owner, ClapTokenAddress, msg.value * clapTokenRewardRate / 10000);
            IERC20(BusdContractAddress).transferFrom(owner, TribalTokenAddress, msg.value * tribalTokenRewardRate / 10000 );
            IERC20(BusdContractAddress).transferFrom(owner, daoTreasureAddress, msg.value * daoTreasureRewardRate / 10000 );

            remaingRewardRate -= ( clapTokenRewardRate + tribalTokenRewardRate + daoTreasureRewardRate);

            address parent;
            parent = invitedBy[owner];
            if(parent != address(0)){
                IERC20(BusdContractAddress).transferFrom(owner, parent, msg.value * friendChainRewardRate[0] / 10000 );
                remaingRewardRate -= friendChainRewardRate[0];
            }
            for(uint i = 1 ;i < generations; i++){
                parent = invitedBy[parent];
                if(parent == address(0))
                    break;
                IERC20(BusdContractAddress).transferFrom(owner, parent, msg.value * friendChainRewardRate[i] / 10000 );
                remaingRewardRate -= friendChainRewardRate[i];
            }


            IERC20(BusdContractAddress).transferFrom(owner, performancePoolAddress, msg.value * performancePoolRewardRate / 10000 );
            IERC20(BusdContractAddress).transferFrom(owner, influenceAddress, msg.value * influenceRewardRate / 10000 );
            remaingRewardRate -= (performancePoolRewardRate + influenceRewardRate);

            //<!---       friend chain reward ---->


            uint256 nPromoter1 = 0;
            uint256 nPromoter2 = 0;
            for(uint256 i = 0 ; i< nPerson; i++) {
                if(persons[addresses[i]].superPromoterLevel == 1){
                    if(block.timestamp - persons[addresses[i]].getQAt <= promoter1Q_time * 4 weeks )
                        nPromoter1++;
                    else
                       persons[addresses[i]].superPromoterLevel = 0;
                }
                if(persons[addresses[i]].superPromoterLevel == 2){
                    if(block.timestamp - persons[addresses[i]].getQAt <= promoter2Q_time * 4 weeks)
                        nPromoter2++;
                    else
                        persons[addresses[i]].superPromoterLevel = 0;
                }
            }

            for(uint256 i = 0 ; i< nPerson; i++) {
                if(persons[addresses[i]].superPromoterLevel == 1){
                    IERC20(BusdContractAddress).transferFrom(owner, addresses[i], msg.value * superPromoter1RewardRate / nPromoter1 / 10000 );

                }
                if(persons[addresses[i]].superPromoterLevel == 2){
                    IERC20(BusdContractAddress).transferFrom(owner, addresses[i], msg.value * superPromoter2RewardRate / nPromoter2 / 10000 );

                }
            }

            // <! ----------- Making Superpromoter ----------------

            parent = invitedBy[owner];
            for(uint i = 0; i < generations; i++ ){
                parent = invitedBy[parent];
                if(parent == address(0))
                    break;

                persons[parent].getQAmount += msg.value;

                if(persons[parent].superPromoterLevel == 0){
                    if(persons[parent].getQAmount >= promoter2Q_price){
                        persons[parent].getQAmount -= promoter2Q_price;
                        persons[parent].superPromoterLevel = 2;
                        persons[parent].getQAt = block.timestamp;
                    }
                    else {
                        if(persons[parent].getQAmount >= promoter1Q_price){
                            persons[parent].getQAmount -= promoter1Q_price;
                            persons[parent].superPromoterLevel = 1;
                            persons[parent].getQAt = block.timestamp;
                        }
                    }
                }
                else {
                    if(persons[parent].superPromoterLevel == 1){
                        if(persons[parent].getQAmount >= (promoter2Q_price - promoter1Q_price)){
                            persons[parent].getQAmount -= (promoter2Q_price - promoter1Q_price);
                            persons[parent].superPromoterLevel = 2;
                            persons[parent].getQAt = block.timestamp;
                        }
                    }
                }


            }

            // ------------------------------------------------------

            // <!--- Reminaing reward --->

            remaingRewardRate -= (superPromoter1RewardRate + superPromoter2RewardRate);

            IERC20(BusdContractAddress).transferFrom(owner, contractOwner, msg.value * remaingRewardRate / 10000 );


            // ------------ MINT ------------------
            // _tokenId.increment();
            // uint256 newItemId = _tokenId.current();

            // tokenIdToCollectionIndex[newItemId] = collectionIndex;
            // mintedTokenLByCollection[collectionIndex]++;
            // tokenIdToCollectionId[newItemId] = mintedTokenLByCollection[collectionIndex];

            // string memory finalURI = string(abi.encodePacked(pinataURL[collectionIndex] , Strings.toString(tokenIdToCollectionId[newItemId]) ,".json"));

            // _safeMint(owner, newItemId);
            // _setTokenURI(newItemId, finalURI);

            // return newItemId;

        }


    function addPerson(
            address invitedPerson
        ) external {
            addresses[nPerson++] = msg.sender;
            uint256[] memory earnedRewardBoxAt = new uint256[](nCollection + 1);
            persons[msg.sender] = Person(
                0,
                earnedRewardBoxAt,

                0,
                block.timestamp,
                0,

                0,
                0,
                0,

                block.timestamp
            );
            invitedBy[msg.sender] = invitedPerson;
        }

    function claim() external {
        Person storage person = persons[msg.sender];

        uint256 nweeks = (block.timestamp - person.lastClaimedAt) / 1 weeks;

        for(uint i = 0 ; i< 8 ;i++){
            if( (block.timestamp - person.earnedRewardBoxAt[i]) / 1 weeks <= rewardPeriod ) {

                IERC20(ClapContractAddress).transferFrom(ClapTokenAddress, msg.sender, nweeks * (clapTokenMaxReward * 1e18) / rewardPeriod);
                IERC20(TribalContractAddress).transferFrom(TribalTokenAddress, msg.sender, nweeks * (tribalTokenMaxReward * 1e18) / rewardPeriod);
            }
        }

        person.lastClaimedAt = person.lastClaimedAt + nweeks * 1 weeks;
    }
    /*-----------------Reward State-----------------------

    ---------------------------------------------------*/

    function setAddresses(
            address newBusdContractAddress,
            address newBusdTokenAddress,
            address newClapContractAddress,
            address newClapTokenAddress,
            address newTribalContractAddress,
            address newTribalTokenAddress,
            address newPerformancePoolAddress,
            address newDaoTreasureAddress

        ) external onlyOwner {
            BusdContractAddress = newBusdContractAddress;
            BusdTokenAddress = newBusdTokenAddress;
            ClapContractAddress = newClapContractAddress;
            ClapTokenAddress = newClapTokenAddress;
            TribalContractAddress = newTribalContractAddress;
            TribalTokenAddress = newTribalTokenAddress;
            performancePoolAddress = newPerformancePoolAddress;
            daoTreasureAddress = newDaoTreasureAddress;
        }


    function setRewardBoxPrice(uint256 newRewardBoxPrice , uint256 index) external onlyOwner {
        rewardBoxPrice[index] = newRewardBoxPrice;
    }

    function setBoxReward(uint256 newBoxReward , uint256 index) external onlyOwner {
        boxReward[index] = newBoxReward;
    }

    function setTokenMaxReward(
            uint256 newClapTokenMaxReward,
            uint256 newTribalTokenMaxReward
        ) external onlyOwner {
            clapTokenMaxReward = newClapTokenMaxReward;
            tribalTokenMaxReward = newTribalTokenMaxReward;
        }


    function setRewardPeroid(uint256 newRewardPeriod) external onlyOwner {
        rewardPeriod = newRewardPeriod;
    }

    function setFriendChainRewardRate(uint256 newFriendChainRewardRate , uint256 index) external onlyOwner {
        friendChainRewardRate[index - 1] = newFriendChainRewardRate;
    }

    function setPoolValue (
            uint256 newPoolRewardRate,
            uint256 newPoolQ_price,
            uint256 newPoolQ_time
        ) external onlyOwner {
            poolRewardRate = newPoolRewardRate;
            poolQ_price = newPoolQ_price;
            poolQ_time = newPoolQ_time;
        }


    function setPromoterValue (
            uint256 newPromoter1Rate,
            uint256 newPromoter2Rate,
            uint256 newPromoter1Q_time,
            uint256 newPromoter2Q_time,
            uint256 newPromoter1Q_price,
            uint256 newPromoter2Q_price
        ) external onlyOwner {
            promoter1Rate = newPromoter1Rate;
            promoter2Rate = newPromoter2Rate;
            promoter1Q_time = newPromoter1Q_time;
            promoter2Q_time = newPromoter2Q_time;
            promoter1Q_price = newPromoter1Q_price;
            promoter2Q_price = newPromoter2Q_price;
        }

    function setOtherRewardRates (
            uint256 newClapTokenRewardRate,
            uint256 newTribalTokenRewardRate,
            uint256 newDaoTreasureRewardRate,
            uint256 newPerformancePoolRewardRate,
            uint256 newInfluenceRewardRate
        ) external onlyOwner {
            clapTokenRewardRate = newClapTokenRewardRate;
            tribalTokenRewardRate = newTribalTokenRewardRate;
            daoTreasureRewardRate = newDaoTreasureRewardRate;
            performancePoolRewardRate = newPerformancePoolRewardRate;
            influenceRewardRate = newInfluenceRewardRate;

        }


    function setSuperPromoterRewardRate (
            uint256 newSuperPromoter1RewardRate,
            uint256 newSuperPromoter2RewardRate
        ) external onlyOwner {
            superPromoter1RewardRate = newSuperPromoter1RewardRate;
            superPromoter2RewardRate = newSuperPromoter2RewardRate;

        }
}
