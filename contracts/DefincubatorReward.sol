//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./others/BokkyPooBahsDateTimeLibrary.sol";


contract DefincubatorReward{
    /*------------------- Mint State  --------------------
    ----------------------------------------------------*/
    address contractOwner;
    uint256 public nCollection;
    uint256 public decimals;
    /*---------------------------------------------------
    ---------------------------------------------------*/

    /*-----------------Reward State-----------------------
    ---------------------------------------------------*/
    address BusdContractAddress;
    address ClapContractAddress;
    address ClapTokenAddress;
    address TribalContractAddress;
    address TribalTokenAddress;


    uint256 curYear;
    uint256 curMonth;

    struct Person{
        uint256 ownedBoxLastIndex;

        uint256[] earnedRewardBoxAt;
        uint256[] clapClaimed;
        uint256[] tribalClaimed;

        uint256 poolRewardAccumulated;
        bool hasPoolQualification;

        uint256 superPromoterLevel;
        uint256 getQAt;
        uint256 getQAmount;

        uint256 clapBalance;
        uint256 tribalBalance;
        uint256 busdBalance;

        uint256 lastClaimedAt;
    }

    uint256 nPerson;
    mapping(uint256 => address) public addresses;
    mapping(address => Person) public persons;
    mapping(address => address) public invitedBy;

    mapping(uint256 => uint256) rewardBoxPrice;
    mapping(uint256 => uint256) boxReward;

    address performancePoolAddress;
    address influenceAddress;
    address daoTreasureAddress;

    uint256 clapTokenMaxReward;
    uint256 tribalTokenMaxReward;

    uint256 rewardPeriod;


    uint256 poolRewardRate;
    uint256 poolQ_price;
    // uint256 poolQ_time;

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

    uint256 generations;
    mapping(uint256 => uint256) friendChainRewardRate;

    constructor(){

        contractOwner = msg.sender;
        nCollection = 8;
        decimals = 5;
        generations = 5;

        (uint year , uint month ,) = BokkyPooBahsDateTimeLibrary.timestampToDate(block.timestamp);
        curYear = year;
        curMonth = month;

    }

    modifier onlyOwner {
        require(msg.sender == contractOwner);
        _;
    }

    /*------------------- Mint Part  --------------------

    ----------------------------------------------------*/

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

            IERC20(BusdContractAddress).transferFrom(owner , address(this), msg.value);
            // IERC20(BusdContractAddress).approve(spender, amount);
            IERC20(BusdContractAddress).transfer(ClapTokenAddress, msg.value * clapTokenRewardRate / 10000);
            IERC20(BusdContractAddress).transfer(TribalTokenAddress, msg.value * tribalTokenRewardRate / 10000 );
            IERC20(BusdContractAddress).transfer(daoTreasureAddress, msg.value * daoTreasureRewardRate / 10000 );

            remaingRewardRate -= ( clapTokenRewardRate + tribalTokenRewardRate + daoTreasureRewardRate);

            address parent;
            // parent = invitedBy[owner];
            // if(parent != address(0)){
            //     IERC20(BusdContractAddress).transfer(parent, msg.value * friendChainRewardRate[0] / 10000 );
            //     remaingRewardRate -= friendChainRewardRate[0];
            // }
            parent = owner;
            for(uint i = 0 ;i < generations; i++){
                parent = invitedBy[parent];
                if(parent == address(0))
                    break;
                IERC20(BusdContractAddress).transfer(parent, msg.value * friendChainRewardRate[i] / 10000 );
                remaingRewardRate -= friendChainRewardRate[i];
            }


             IERC20(BusdContractAddress).transfer(influenceAddress, msg.value * influenceRewardRate / 10000 );
            remaingRewardRate -= (performancePoolRewardRate + influenceRewardRate);

            //<!----performance pool reward calculate
            (uint year , uint month, ) =  BokkyPooBahsDateTimeLibrary.timestampToDate(block.timestamp);


            parent = owner;
            if(curYear == year && curMonth == month) {
                for(uint i = 0 ;i < generations; i++){
                    parent = invitedBy[parent];
                    if(parent == address(0))
                        break;
                    persons[parent].poolRewardAccumulated += rewardBoxPrice[collectionIndex];
                    if(persons[parent].poolRewardAccumulated >= poolQ_price)
                        persons[parent].hasPoolQualification = true;

                }
            }
            else{
                curYear = year;
                curMonth = month;
                bool flag = true;
                for(uint i = 0; i< nPerson ; i++) {
                    if(flag && persons[addresses[i]].poolRewardAccumulated >= poolQ_price){
                        //
                        //
                        //
                        //
                        //  All performance Qualified people should get reward in this part
                        uint256 nQualifiedPeople = 0;
                        for(uint256 j = 0 ; j< nPerson; j++) {
                            if(persons[addresses[j]].poolRewardAccumulated >= poolQ_price)
                                nQualifiedPeople++;
                        }
                        if(nQualifiedPeople > 0){
                            uint256 balance = IERC20(BusdContractAddress).balanceOf(performancePoolAddress);
                            for(uint256 j = 0 ; j< nPerson; j++) {
                                if(persons[addresses[j]].poolRewardAccumulated >= poolQ_price)
                                    IERC20(BusdContractAddress).transferFrom(performancePoolAddress , addresses[j], balance / nQualifiedPeople );

                            }
                        }
                        //
                        //
                        //
                        //
                        //
                        flag = false;
                    }
                    persons[addresses[i]].poolRewardAccumulated = 0;
                }
            }

            IERC20(BusdContractAddress).transfer(performancePoolAddress, msg.value * performancePoolRewardRate / 10000 );


            //<!--- Infinity reward ---->


            // uint256 nPromoter1 = 0;
            // uint256 nPromoter2 = 0;
            // for(uint256 i = 0 ; i< nPerson; i++) {
            //     if(persons[addresses[i]].superPromoterLevel == 1){
            //         if(block.timestamp - persons[addresses[i]].getQAt <= promoter1Q_time * 4 weeks )
            //             nPromoter1++;
            //         else
            //            persons[addresses[i]].superPromoterLevel = 0;
            //     }
            //     if(persons[addresses[i]].superPromoterLevel == 2){
            //         if(block.timestamp - persons[addresses[i]].getQAt <= promoter2Q_time * 4 weeks)
            //             nPromoter2++;
            //         else
            //             persons[addresses[i]].superPromoterLevel = 0;
            //     }
            // }

            // if(nPromoter1 > 0){
            //     for(uint256 i = 0 ; i< nPerson; i++) {
            //         if(persons[addresses[i]].superPromoterLevel == 1){
            //             IERC20(BusdContractAddress).transfer(addresses[i], msg.value * promoter1Rate / nPromoter1 / 10000 );

            //         }
            //     }
            // }
            // if(nPromoter2 > 0){
            //     for(uint256 i = 0 ; i< nPerson; i++) {
            //         if(persons[addresses[i]].superPromoterLevel == 2){
            //             IERC20(BusdContractAddress).transfer(addresses[i], msg.value * promoter2Rate / nPromoter2 / 10000 );

            //         }
            //     }
            // }



            parent = owner;
            bool promoter1Paid = false;
            bool promoter2Paid = false;
            while(true){
                parent = invitedBy[parent];
                if(parent == address(0))
                    break;
                if(persons[parent].superPromoterLevel == 1){
                    if(block.timestamp - persons[parent].getQAt <= promoter1Q_time * 4 weeks){
                        if(!promoter1Paid){
                            IERC20(BusdContractAddress).transfer(parent, msg.value * promoter1Rate / 10000 );
                            promoter1Paid = true;

                            remaingRewardRate -= promoter1Rate ;
                        }
                    }
                    else {
                        persons[parent].superPromoterLevel = 0;
                    }
                }
                if(persons[parent].superPromoterLevel == 2){
                    if(block.timestamp - persons[parent].getQAt <= promoter2Q_time * 4 weeks){
                        if(!promoter2Paid){
                            IERC20(BusdContractAddress).transfer(parent, msg.value * promoter2Rate / 10000 );
                            promoter2Paid = true;

                            remaingRewardRate -= promoter2Rate ;
                        }
                    }
                    else {
                        persons[parent].superPromoterLevel = 0;
                    }
                }

            }

            // <! ----------- Making Superpromoter ----------------

            parent = owner;
            for(uint i = 0; i < generations; i++ ){
                parent = invitedBy[parent];
                if(parent == address(0))
                    break;

                persons[parent].getQAmount += rewardBoxPrice[collectionIndex];

                if(persons[parent].superPromoterLevel == 0 && persons[parent].hasPoolQualification){
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


            IERC20(BusdContractAddress).transfer(contractOwner, msg.value * remaingRewardRate / 10000 );

        }


    function addPerson(
            address invitedPerson
        ) external {

            require(invitedBy[invitedPerson] != msg.sender , "can't set him as invited Person");
            require(persons[invitedPerson].ownedBoxLastIndex > 0 || invitedPerson == contractOwner , "only owned at least one collection can invite you");

            addresses[nPerson++] = msg.sender;
            uint256[] memory earnedRewardBoxAt = new uint256[](nCollection + 1);
            uint256[] memory clapClaimed = new uint256[](nCollection + 1);
            uint256[] memory tribalClaimed = new uint256[](nCollection + 1);
            persons[msg.sender] = Person(
                0,

                earnedRewardBoxAt,
                clapClaimed,
                tribalClaimed,

                0,
                false,

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

    function claimClapAndTribalToken() external {
        Person storage person = persons[msg.sender];

        uint256 nweeks = (block.timestamp - person.lastClaimedAt) / 1 weeks;

        for(uint256 i = 1 ; i<= person.ownedBoxLastIndex ;i++){
            if( (block.timestamp - person.earnedRewardBoxAt[i]) / 1 weeks <= rewardPeriod ) {

                IERC20(ClapContractAddress).transferFrom(ClapTokenAddress, msg.sender, nweeks * clapTokenMaxReward * boxReward[i] / 10000 / rewardPeriod);
                IERC20(TribalContractAddress).transferFrom(TribalTokenAddress, msg.sender, nweeks * tribalTokenMaxReward * boxReward[i] / 10000 / rewardPeriod);

                person.clapClaimed[i] += nweeks * clapTokenMaxReward * boxReward[i] / 10000 / rewardPeriod;
                person.tribalClaimed[i] += nweeks * tribalTokenMaxReward * boxReward[i] / 10000 / rewardPeriod;
            }

            else {
                if(person.clapClaimed[i] < clapTokenMaxReward * boxReward[i] / 10000){
                    IERC20(ClapContractAddress).transferFrom(ClapTokenAddress,msg.sender, clapTokenMaxReward * boxReward[i] / 10000 - person.clapClaimed[i]  );
                    person.clapClaimed[i] = clapTokenMaxReward * boxReward[i] / 10000;
                }
                if(person.tribalClaimed[i] < tribalTokenMaxReward * boxReward[i] / 10000){
                    IERC20(TribalContractAddress).transferFrom(TribalTokenAddress,msg.sender, tribalTokenMaxReward * boxReward[i] / 10000 - person.tribalClaimed[i]  );
                    person.tribalClaimed[i] = tribalTokenMaxReward * boxReward[i] / 10000;
                }
            }

        }

        person.lastClaimedAt = person.lastClaimedAt + nweeks * 1 weeks;
    }

    // function claimPerformacePoolReward() external {
    //     (uint year , uint month, ) =  BokkyPooBahsDateTimeLibrary.timestampToDate(block.timestamp);


    //          address parent = msg.sender;
    //         if(curYear == year && curMonth == month) {
    //             for(uint i = 0 ;i < generations; i++){
    //                 parent = invitedBy[parent];
    //                 if(parent == address(0))
    //                     break;
    //                 persons[parent].poolRewardAccumulated += rewardBoxPrice[collectionIndex];
    //                 if(persons[parent].poolRewardAccumulated >= poolQ_price)
    //                     persons[parent].hasPoolQualification = true;

    //             }
    //         }
    //         else{
    //             curYear = year;
    //             curMonth = month;
    //             bool flag = true;
    //             for(uint i = 0; i< nPerson ; i++) {
    //                 if(flag && persons[addresses[i]].poolRewardAccumulated >= poolQ_price){
    //                     //
    //                     //
    //                     //
    //                     //
    //                     //  All performance Qualified people should get reward in this part
    //                     uint256 nQualifiedPeople = 0;
    //                     for(uint256 j = 0 ; j< nPerson; j++) {
    //                         if(persons[addresses[j]].poolRewardAccumulated >= poolQ_price)
    //                             nQualifiedPeople++;
    //                     }
    //                     if(nQualifiedPeople > 0){
    //                         uint256 balance = IERC20(BusdContractAddress).balanceOf(performancePoolAddress);
    //                         for(uint256 j = 0 ; j< nPerson; j++) {
    //                             if(persons[addresses[j]].poolRewardAccumulated >= poolQ_price)
    //                                 IERC20(BusdContractAddress).transferFrom(performancePoolAddress , addresses[j], balance / nQualifiedPeople );

    //                         }
    //                     }
    //                     //
    //                     //
    //                     //
    //                     //
    //                     //
    //                     flag = false;
    //                 }
    //                 persons[addresses[i]].poolRewardAccumulated = 0;
    //             }
    //         }
    // }
    //each user should call this function on first day of month.
    // function claminPoolReward() external {

    // }
    /*-----------------Reward State-----------------------

    ---------------------------------------------------*/

    function setAddresses(
            address newBusdContractAddress,
            address newClapContractAddress,
            address newClapTokenAddress,
            address newTribalContractAddress,
            address newTribalTokenAddress,
            address newPerformancePoolAddress,
            address newDaoTreasureAddress,
            address newInfluenceAddress

        ) external onlyOwner {
            BusdContractAddress = newBusdContractAddress;
            ClapContractAddress = newClapContractAddress;
            ClapTokenAddress = newClapTokenAddress;
            TribalContractAddress = newTribalContractAddress;
            TribalTokenAddress = newTribalTokenAddress;
            performancePoolAddress = newPerformancePoolAddress;
            daoTreasureAddress = newDaoTreasureAddress;
            influenceAddress = newInfluenceAddress;
        }


    function setRewardBoxPrice(uint256 newRewardBoxPrice , uint256 index) external onlyOwner {
        rewardBoxPrice[index] = newRewardBoxPrice * (10 ** decimals);
    }

    function setBoxReward(uint256 newBoxReward , uint256 index) external onlyOwner {
        boxReward[index] = newBoxReward * 100;
    }

    function setTokenMaxReward(
            uint256 newClapTokenMaxReward,
            uint256 newTribalTokenMaxReward
        ) external onlyOwner {
            clapTokenMaxReward = newClapTokenMaxReward* (10 ** decimals);
            tribalTokenMaxReward = newTribalTokenMaxReward* (10 ** decimals);
        }


    function setRewardPeriodWeeks(uint256 newRewardPeriod) external onlyOwner {
        rewardPeriod = newRewardPeriod ;
    }

    function setFriendChainRewardRate(uint256 newFriendChainRewardRate , uint256 index) external onlyOwner {
        friendChainRewardRate[index - 1] = newFriendChainRewardRate * 100;
    }

    function setPoolValue (
            uint256 newPoolRewardRate,
            uint256 newPoolQ_price
            // uint256 newPoolQ_time
        ) external onlyOwner {
            poolRewardRate = newPoolRewardRate * 100;
            poolQ_price = newPoolQ_price* (10 ** decimals);
            // poolQ_time = newPoolQ_time;
        }


    function setPromoterValue (
            uint256 newPromoter1Rate,
            uint256 newPromoter2Rate,
            uint256 newPromoter1Q_time,
            uint256 newPromoter2Q_time,
            uint256 newPromoter1Q_price,
            uint256 newPromoter2Q_price
        ) external onlyOwner {
            promoter1Rate = newPromoter1Rate * 100;
            promoter2Rate = newPromoter2Rate * 100;
            promoter1Q_time = newPromoter1Q_time;
            promoter2Q_time = newPromoter2Q_time;
            promoter1Q_price = newPromoter1Q_price* (10 ** decimals);
            promoter2Q_price = newPromoter2Q_price* (10 ** decimals);
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
    function withdraw() external onlyOwner {
        uint256 balance = IERC20(BusdContractAddress).balanceOf(address(this));
        IERC20(BusdContractAddress).transfer(contractOwner , balance);
    }
}
