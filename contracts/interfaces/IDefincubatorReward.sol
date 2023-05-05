//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDefincubatorReward {
    function purchaseNFT(uint256 , uint256 , address , address) external payable ;
    function addNewCollection(uint256) external;
    function approveToMoveTokens(address from , address to) external view returns(bool);
}
