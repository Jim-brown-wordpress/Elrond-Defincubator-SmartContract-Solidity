//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Sample1.sol";

contract Sample2 {
    address private addressSample1;

    constructor(address _addressSample1) {
        addressSample1 = _addressSample1;
    }

    function getN() external view returns(uint256) {
        Sample1 vS = Sample1(addressSample1);
        return vS.getNum();
    }
}
