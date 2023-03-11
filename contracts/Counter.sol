// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use c

contract Counter {
    uint256 public counter;

    constructor() {
        counter = 0;
    }

    function increment() external {
        counter += 1;
    }
}
