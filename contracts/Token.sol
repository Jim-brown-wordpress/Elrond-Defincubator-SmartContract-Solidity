//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    string tokenName;
    string tokenSymbol;


    constructor(
        string memory _tokenName ,
        string memory _tokenSymbol
    ) ERC20(_tokenName , _tokenSymbol) {
        tokenName = name();
        tokenSymbol = symbol();
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }


}
