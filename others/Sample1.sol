//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Sample1 {
    uint256 private number1;

    function getNum() external view returns(uint256){
        return number1;
    }

    function increaseNum() external {
        number1++;
    }

}
