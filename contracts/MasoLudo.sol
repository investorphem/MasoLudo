// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MasoLudo {
    using ECDSA for bytes32;

    IERC20 public cUSD;
    address public admin;
    address public serverSigner;
    uint256 public feePercent = 3;

    struct Duel {
        address playerA;
        address playerB;
        uint256 wager;
        bool active;
    }

    mapping(uint256 => Duel) public duels;
    uint256 public duelCount;

    constructor(address _cUSD, address _signer) {
        cUSD = IERC20(_cUSD);
        serverSigner = _signer;
        admin = msg.sender;
    }

    function createGame(uint256 _amount) external {
        require(cUSD.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        duelCount++;
        duels[duelCount] = Duel(msg.sender, address(0), _amount, false);
    }

    function joinGame(uint256 _id) external {
        Duel storage d = duels[_id];
        require(cUSD.transferFrom(msg.sender, address(this), d.wager), "Transfer failed");
        d.playerB = msg.sender;
        d.active = true;
    }

    function settle(uint256 _id, address _winner, bytes calldata _sig) external {
        Duel storage d = duels[_id];
        require(d.active, "Game not active");
        
        bytes32 hash = keccak256(abi.encodePacked(_id, _winner));
        require(hash.toEthSignedMessageHash().recover(_sig) == serverSigner, "Invalid Signature");

        uint256 total = d.wager * 2;
        uint256 fee = (total * feePercent) / 100;
        
        d.active = false;
        cUSD.transfer(_winner, total - fee);
        cUSD.transfer(admin, fee);
    }
}
