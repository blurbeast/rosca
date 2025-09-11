// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {RoscaSecure} from "../src/Rosca.sol";

contract RoscaSecureTest is Test {
    RoscaSecure public rosca;

    address public alice = address(0x1);
    address public bob = address(0x2);

    function setUp() public {
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.startPrank(alice);
        rosca = new RoscaSecure();
    }
}
