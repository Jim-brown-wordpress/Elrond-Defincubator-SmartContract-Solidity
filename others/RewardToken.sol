//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RewardToken is ERC20 , ERC20Burnable , AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256[] private rewardPercent = new uint256[](8);

    uint256 public stakedTotal;
    uint256 public stakingStartTime;
    uint256 constant stakingTime = 180 seconds;
    uint256 constant token = 10e18;

    struct Staker {
        uint256[] tokenIds;
        mapping(uint256 => uint256) tokenStakingCoolDown;
        uint256 balance;
        uint256 rewardsRelease;
    }

    mapping(address => Staker) public stakers;
    mapping(uint256 => address) public tokenOwner;
    bool public tokensClaimable;
    bool initialised;

    event Staked(address owner , uint256 amount);
    event UnStaked(address owner , uint256 amount);
    event RewardPaid(address indexed user , uint256 reward);
    event ClaimableStatusupdated(bool status);
    event EmergencyUnstake(address indexed user , uint256 tokenId);

    constructor() ERC20("RewardToken" , "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

    }

    function mint(address to , uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function intiStaking() public onlyOwner {
        require(!initialised , "Already initialised");
        stakingStartTime = block.timestamp;
        initialised = ture;
    }

    function setTokensClaimable(bool _enabled) public onlyOwner {
        tokensClaimable = _enabled;
        emit ClaimableStatusupdated(_enabled);
    }

    function getStakedTokens(address _user)
        public
        view
        returns (uint256[] memory tokenIds)
        {
            return stakers[_user].tokenIds;
        }

    function stake(uint256 tokenId)
        public
        {
            _stake(msg.sender , tokenId);
        }

    function stakeBatch(uint256[] memory tokenIds)
        public
        {
            for(uint256 i = 0; i < tokenIds.length; i++) {
                _stake(msg.sender , tokenIds[i]);
            }
        }
    function _stake(address _user , uint256 _tokenId)
        internal
        {
            require(initialised , "Staking system has not started");
            require(
                nft.ownerOf(_tokenId) = _user,
                "user must be the owner of the token"
            );

            Staker storage staker = stakers[_user];

            staker.tokenIds.push(_tokenId);
            staker.tokenStakingCoolDown[_tokenId] = block.timestamp;
            tokenOwner[_tokenId] = _user;
            nft.approve(address(this) , _tokenId);
            nft.safeTransferFrom(_user , address(this) , _tokenId);

            emit Staked(_user, _tokenId);
            stakedTotal++;
        }

    function _unstake(address _user , uint256 _tokenId)
        internal
        {
            require(
                tokenOwner[_tokenId] == _user,
                "Nft Staking system: user must be the owner of the staked nft"
            );
            Staker storage staker = stakers[_user];

            uint256 lastindex = staker.tokenIds.length - 1;
            uint256 lastIndexKey = staker.tokenIds[lastIndex];

            if(staker.tokenIds.length > 0)
                staker.tokenIds.pop();
            staker.tokenStakingCoolDown[_tokenId] = 0;

            if(staker.balance == 0)
                delete stakers[_user];

            delete tokenOwner[_tokenId];
        }
}
