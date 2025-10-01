// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDCToken is ERC20{
    constructor(address initialOwner)
        ERC20("USDC Token", "USDC")
    {}

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }
}
