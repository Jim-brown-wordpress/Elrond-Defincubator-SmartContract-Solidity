//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./interfaces/IDefincubatorNFT.sol";


contract DefincubatorNFT1 is IDefincubatorNFT, ERC721URIStorage , Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenId;

    string private pinataURL = "https://gateway.pinata.cloud/ipfs/QmVDQzbVFk26dfVfZUWKdygsKUJzuHJRj5Hb4rfDTU3hgK/";
    // string private pinataURL;

    string public collectionName;
    string public collectionSymbol;

    // uint256 private constant tokenPrice = 10;


    constructor(string memory _collectionName , string memory _collectionSymbol , string memory _pinataURL) ERC721(_collectionName , _collectionSymbol) {
        collectionName = name();
        collectionSymbol = symbol();
        pinataURL = _pinataURL;
    }

    function getPinataURL() external view returns(string memory) {
        return pinataURL;
    }

    function setPinataURL(string memory _pinataURL) external {
        pinataURL = _pinataURL;
    }

    function createDefincubatorNFT() public override returns(uint256){
        _tokenId.increment();
        uint256 newItemId = _tokenId.current();
        string memory finalURI = string(abi.encodePacked(pinataURL , Strings.toString(newItemId) ,".json"));

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalURI);

        return newItemId;

    }

    function ownedTokens(address owner) external view override returns (string[] memory){
        string[] memory tokens = new string[](balanceOf(owner));
        uint256 count = 0;
        if(balanceOf(owner) > 0){
            for(uint256 i = 1; i <= _tokenId.current(); i++){
                if(ownerOf(i) == owner)
                    tokens[count] = tokenURI(i);
                    count++;
            }
        }
        return tokens;
    }
}
