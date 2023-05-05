//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./others/BokkyPooBahsDateTimeLibrary.sol";

import "./interfaces/IDefincubatorNFT.sol";


contract DefincubatorReward{
    /*------------------- Mint State  --------------------
    ----------------------------------------------------*/
    address contractOwner;
    uint256 public nCollections;
    mapping(uint256 => address) public collectionAddresses;
    uint256 public nBoxesOfCollection;
    uint256 public decimals;
    /*---------------------------------------------------
    ---------------------------------------------------*/

    /*-----------------Reward State-----------------------
    ---------------------------------------------------*/
    address BusdContractAddress;

    struct PayPlan{
        uint256 boxPrice;
        uint256 rewardTokenTotalAmount;

        address payTokenContractAddress;
        address payTokenSourceAddress;
        address payTokenDestinationAddress;
        uint256 payRate;

        uint256 performancePoolRate;
        uint256 infinity1Rate;
        uint256 infinity2Rate;
        uint256 influencerRate;
        uint256 treasureRate;
    }

    struct BoxInfo{
        uint256 collectionID;
        uint256 rewardBoxIndex;
        uint256 earnedAt;
        uint256 claimedAmount;
    }

    mapping(uint256 => mapping(uint256 => PayPlan)) public payPlan;

    struct Person{
        uint256 poolRewardAccumulated;
        bool hasPoolQualification;

        uint256 superPromoterLevel;
        uint256 getQAt;
        uint256 getQAmount;

        uint256 nChild;
        uint256 lastClaimedAt;

        uint256 ownedBoxLastIndex;
        mapping(uint256 => uint256) ownedNBoxesByCollection;
        mapping(uint256 => BoxInfo) rewardBoxes;
    }

    uint256 nPerson;
    mapping(uint256 => address) public addresses;
    mapping(address => Person) public persons;
    mapping(address => address) public invitedBy;
    mapping(address => mapping(uint256 => address)) public childs;

    address performancePoolAddress;
    address influenceAddress;
    address treasureAddress;

    uint256 rewardPeriod;
    uint256 poolQ_price;

    uint256 promoter1Q_time;
    uint256 promoter2Q_time;

    uint256 promoter1Q_price;
    uint256 promoter2Q_price;

    /*---------------------------------------------------

    ---------------------------------------------------*/

    uint256 generations;
    mapping(uint256 => uint256) friendChainRewardRate;

    mapping(address => mapping(address => bool) ) public approveToMoveTokens;

    constructor(){

        contractOwner = msg.sender;
        nBoxesOfCollection = 8;
        decimals = 18;
        generations = 5;
    }

    modifier onlyOwner {
        require(msg.sender == contractOwner);
        _;
    }

    /* ----------------Set Reward Plan -------------------
        parameter: collectionID , rewardBoxIndex , contractAddr , sourceAddr , destinationAddr
        description:
    -----------------------------------------------------*/

    function setDecimals(uint256 _decimals) external onlyOwner {
        decimals = _decimals;
    }

    function addNewCollection(
        uint256 collectionID
    ) external {

        require(collectionID == nCollections + 1 , "something wrong in add-collection");

        nCollections++;
        collectionAddresses[collectionID] = msg.sender;
    }

    function setPayPlan1(
        uint256 collectionID,
        uint256 rewardBoxIndex,
        uint256 boxPrice,
        uint256 rewardTokenTotalAmount,
        address contractAddr,
        address sourceAddr,
        address destinationAddr
    ) external onlyOwner {
        require(collectionID <= nCollections , "something wrong in add-collection");
        PayPlan storage plan = payPlan[collectionID][rewardBoxIndex];
        plan.boxPrice = boxPrice * (10 ** decimals);
        plan.rewardTokenTotalAmount = rewardTokenTotalAmount;
        plan.payTokenContractAddress = contractAddr;
        plan.payTokenSourceAddress = sourceAddr;
        plan.payTokenDestinationAddress = destinationAddr;
    }

    function setPayPlan2(
        uint256 collectionID,
        uint256 rewardBoxIndex,
        uint256 payRate,
        uint256 performancePoolRate,
        uint256 infinity1Rate,
        uint256 infinity2Rate,
        uint256 influencerRate,
        uint256 treasureRate
    ) external onlyOwner {
        require(collectionID <= nCollections , "something wrong in add-collection");
        PayPlan storage plan = payPlan[collectionID][rewardBoxIndex];
        plan.payRate = payRate;
        plan.performancePoolRate = performancePoolRate;
        plan.infinity1Rate = infinity1Rate;
        plan.infinity2Rate = infinity2Rate;
        plan.influencerRate = influencerRate;
        plan.treasureRate = treasureRate;
    }

    /*------------------- Mint Part  --------------------

    ----------------------------------------------------*/

    function purchaseNFT(
            uint256 collectionID,
            uint256 rewardBoxIndex,
            address owner,
            address inviter
        )
        external{

            require(IERC20(BusdContractAddress).balanceOf(owner) >= payPlan[collectionID][rewardBoxIndex].boxPrice , "balance not enough to buy");
            Person storage person = persons[owner];
            require(person.ownedNBoxesByCollection[collectionID] == rewardBoxIndex - 1 , "you can not purchase this Box");

            person.ownedNBoxesByCollection[collectionID] = rewardBoxIndex;

            if(person.ownedBoxLastIndex == 0)
                addPerson(owner, inviter);

            // ------------ Reward ------------------
            person.ownedBoxLastIndex++;
            person.rewardBoxes[person.ownedBoxLastIndex] = BoxInfo(collectionID , rewardBoxIndex , block.timestamp, 0);

            uint256 remaingRewardRate = 10000;
            uint256 price = payPlan[collectionID][rewardBoxIndex].boxPrice;

            IERC20(BusdContractAddress).transferFrom(owner , address(this), price);
            IERC20(BusdContractAddress).transfer(
                payPlan[collectionID][rewardBoxIndex].payTokenDestinationAddress,
                price * payPlan[collectionID][rewardBoxIndex].payRate / 10000
            );
            IERC20(BusdContractAddress).transfer(treasureAddress,
                price * payPlan[collectionID][rewardBoxIndex].treasureRate / 10000
            );

            remaingRewardRate -= ( payPlan[collectionID][rewardBoxIndex].payRate + payPlan[collectionID][rewardBoxIndex].treasureRate);

            address parent;
            parent = owner;
            for(uint i = 0 ;i < generations; i++){
                parent = invitedBy[parent];
                if(parent == contractOwner)
                    break;
                IERC20(BusdContractAddress).transfer(parent, price * friendChainRewardRate[i] / 10000 );
                remaingRewardRate -= friendChainRewardRate[i];
            }


             IERC20(BusdContractAddress).transfer(
                    influenceAddress,
                    price * payPlan[collectionID][rewardBoxIndex].influencerRate / 10000
                );
            remaingRewardRate -= (payPlan[collectionID][rewardBoxIndex].performancePoolRate + payPlan[collectionID][rewardBoxIndex].influencerRate);

            //<!----performance pool reward calculate
            parent = owner;
            for(uint i = 0 ;i < generations; i++){
                parent = invitedBy[parent];
                if(parent == contractOwner)
                    break;
                persons[parent].poolRewardAccumulated += payPlan[collectionID][rewardBoxIndex].boxPrice;
                if(persons[parent].poolRewardAccumulated >= poolQ_price)
                    persons[parent].hasPoolQualification = true;

            }

            IERC20(BusdContractAddress).transfer(
                performancePoolAddress,
                price * payPlan[collectionID][rewardBoxIndex].performancePoolRate / 10000
            );

            //<! infinity reward> //
            parent = owner;
            bool promoter1Paid = false;
            bool promoter2Paid = false;
            while(true){
                parent = invitedBy[parent];
                if(parent == contractOwner)
                    break;
                if(promoter1Paid && promoter2Paid)
                    break;
                if(persons[parent].superPromoterLevel == 1){
                    if(block.timestamp - persons[parent].getQAt <= promoter1Q_time * 4 weeks){
                        if(!promoter1Paid){
                            IERC20(BusdContractAddress).transfer(
                                parent,
                                price * payPlan[collectionID][rewardBoxIndex].infinity1Rate / 10000
                            );
                            promoter1Paid = true;

                            remaingRewardRate -= payPlan[collectionID][rewardBoxIndex].infinity1Rate ;
                        }
                    }
                    else {
                        persons[parent].superPromoterLevel = 0;
                    }
                }
                if(persons[parent].superPromoterLevel == 2){
                    if(block.timestamp - persons[parent].getQAt <= promoter2Q_time * 4 weeks){
                        if(!promoter2Paid){
                            IERC20(BusdContractAddress).transfer(
                                parent,
                                price * payPlan[collectionID][rewardBoxIndex].infinity2Rate / 10000
                            );
                            promoter2Paid = true;

                            remaingRewardRate -= payPlan[collectionID][rewardBoxIndex].infinity2Rate ;
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
                if(parent == contractOwner)
                    break;

                persons[parent].getQAmount += payPlan[collectionID][rewardBoxIndex].boxPrice;

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


            IERC20(BusdContractAddress).transfer(contractOwner, price * remaingRewardRate / 10000 );

        }

    // only will call this function last day of each month in backend
    function sendPoolReward() external onlyOwner {
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

    function approve(address to) external onlyOwner {
        invitedBy[to] = contractOwner;
    }

    function addPerson(
            address owner,
            address inviter
        ) internal {

            require(invitedBy[inviter] != owner , "can't set him as invited Person");
            require(persons[inviter].ownedBoxLastIndex > 0 || (inviter == contractOwner && invitedBy[owner] == contractOwner ), "only owned at least one collection can invite you");

            addresses[nPerson++] = owner;
            Person storage newPerson = persons[owner];
            newPerson.poolRewardAccumulated = 0;
            newPerson.hasPoolQualification = false;
            newPerson.superPromoterLevel = 0;
            newPerson.getQAt = block.timestamp;
            newPerson.getQAmount = 0;
            newPerson.nChild = 0;
            newPerson.lastClaimedAt = block.timestamp;
            newPerson.ownedBoxLastIndex = 0;


            invitedBy[owner] = inviter;

            if(inviter != contractOwner){
                Person storage inviterP = persons[inviter];
                childs[inviter][inviterP.nChild] = owner;
                inviterP.nChild++;
            }
        }

    function claimToken() external {
        Person storage person = persons[msg.sender];

        uint256 nweeks = (block.timestamp - person.lastClaimedAt) / 1 weeks;

        for(uint256 i = 1 ; i<= person.ownedBoxLastIndex ;i++){
            uint256 total = payPlan[person.rewardBoxes[i].collectionID][person.rewardBoxes[i].rewardBoxIndex].rewardTokenTotalAmount;
            if( (block.timestamp - person.rewardBoxes[i].earnedAt) / 1 weeks <= rewardPeriod ) {

                IERC20(
                    payPlan[person.rewardBoxes[i].collectionID][person.rewardBoxes[i].rewardBoxIndex].payTokenContractAddress
                ).transferFrom(
                    payPlan[person.rewardBoxes[i].collectionID][person.rewardBoxes[i].rewardBoxIndex].payTokenSourceAddress,
                    msg.sender,
                    nweeks * total / rewardPeriod
                );

                person.rewardBoxes[i].claimedAmount += nweeks * total / rewardPeriod;
            }

            else {
                if(person.rewardBoxes[i].claimedAmount < total){
                    IERC20(
                        payPlan[person.rewardBoxes[i].collectionID][person.rewardBoxes[i].rewardBoxIndex].payTokenContractAddress
                    ).transferFrom(
                        payPlan[person.rewardBoxes[i].collectionID][person.rewardBoxes[i].rewardBoxIndex].payTokenSourceAddress,
                        msg.sender,
                        total - person.rewardBoxes[i].claimedAmount
                    );
                    person.rewardBoxes[i].claimedAmount = total;
                }
            }

        }

        person.lastClaimedAt = person.lastClaimedAt + nweeks * 1 weeks;
    }

    function tokenTransfer(address to) external {
        require(
            persons[msg.sender].ownedBoxLastIndex > 0,
            "you don't have any token"
        );

        addPerson(to, msg.sender);
        if(msg.sender != contractOwner) {
            persons[msg.sender].nChild--;
            childs[msg.sender][persons[msg.sender].nChild] = address(0);
        }

        Person storage _owner = persons[msg.sender];
        Person storage _to = persons[to];

        for(uint256 i = 1; i<= nCollections; i++){
            if(_owner.ownedNBoxesByCollection[i] == 0)
                break;
            _to.ownedNBoxesByCollection[i] = _owner.ownedNBoxesByCollection[i];
            _owner.ownedNBoxesByCollection[i] = 0;

            IDefincubatorNFT(collectionAddresses[i]).tokenTransfer(msg.sender , to);
        }

        for(uint256 i = 1; i <= nBoxesOfCollection; i++) {
            _to.rewardBoxes[i] = BoxInfo(
                _owner.rewardBoxes[i].collectionID,
                _owner.rewardBoxes[i].rewardBoxIndex,
                _owner.rewardBoxes[i].earnedAt,
                _owner.rewardBoxes[i].claimedAmount
            );
            _owner.rewardBoxes[i] = BoxInfo(
                0,
                0,
                0,
                0
            );
        }


        _to.ownedBoxLastIndex = _owner.ownedBoxLastIndex;
        _owner.ownedBoxLastIndex = 0;

        _to.poolRewardAccumulated = _owner.poolRewardAccumulated;
        _owner.poolRewardAccumulated = 0;
        _to.hasPoolQualification = _owner.hasPoolQualification;
        _owner.hasPoolQualification = false;
        _to.superPromoterLevel = _owner.superPromoterLevel;
        _owner.superPromoterLevel = 0;
        _to.getQAt = _owner.getQAt;
        _owner.getQAt = 0;
        _to.getQAmount = _owner.getQAmount;
        _owner.getQAmount = 0;
        _to.lastClaimedAt = _owner.lastClaimedAt;
        _owner.lastClaimedAt = 0;

        invitedBy[to] = invitedBy[msg.sender];

        for(uint256 i = 0; i < _owner.nChild ; i++) {
            childs[to][_to.nChild + i] = childs[msg.sender][i];
            invitedBy[childs[msg.sender][i]] = to;
            childs[msg.sender][i] = address(0);
        }
        _to.nChild += _owner.nChild;
        _owner.nChild = 0;

        approveToMoveTokens[msg.sender][to] = false;
    }

    function setApprovalForAll(address to , bool _approve) external {
        approveToMoveTokens[msg.sender][to] = _approve;
    }


    /*-----------------Reward State-----------------------

    ---------------------------------------------------*/

    function setAddresses(
            address newBusdContractAddress,
            address newPerformancePoolAddress,
            address newTreasureAddress,
            address newInfluenceAddress

        ) external onlyOwner {
            BusdContractAddress = newBusdContractAddress;
            performancePoolAddress = newPerformancePoolAddress;
            treasureAddress = newTreasureAddress;
            influenceAddress = newInfluenceAddress;
        }


    function setRewardPeriodWeeks(uint256 newRewardPeriod) external onlyOwner {
        rewardPeriod = newRewardPeriod ;
    }

    function setFriendChainRewardRate(uint256 newFriendChainRewardRate , uint256 index) external onlyOwner {
        friendChainRewardRate[index - 1] = newFriendChainRewardRate * 100;
    }

    function setPoolValue (
            uint256 newPoolQ_price
        ) external onlyOwner {
            poolQ_price = newPoolQ_price* (10 ** decimals);
        }


    function setPromoterValue (
            uint256 newPromoter1Q_time,
            uint256 newPromoter2Q_time,
            uint256 newPromoter1Q_price,
            uint256 newPromoter2Q_price
        ) external onlyOwner {
            promoter1Q_time = newPromoter1Q_time;
            promoter2Q_time = newPromoter2Q_time;
            promoter1Q_price = newPromoter1Q_price* (10 ** decimals);
            promoter2Q_price = newPromoter2Q_price* (10 ** decimals);
        }
    function withdraw() external onlyOwner {
        uint256 balance = IERC20(BusdContractAddress).balanceOf(address(this));
        IERC20(BusdContractAddress).transfer(contractOwner , balance);
    }
}
