// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Wallet {
    string public name;
    address public owner;
    address public backupAddress;

    constructor(address _backupAccount, string memory _name) {
        owner = msg.sender;
        backupAddress = _backupAccount;
        name = _name;
    }

    function withdraw() external {
        require(owner == msg.sender, "not owner");
        (bool status, ) = owner.call{value: address(this).balance}("");
        require(status, "failed");
    }

    function call(address _contractAddres, bytes memory _data) public payable {
        require(msg.sender == owner, "not owner");
        (bool status, ) = _contractAddres.call{value: msg.value}(_data);
        require(status, "failed");
    }

    function recoverAccount(address _backupAddress) external {
        require(msg.sender == backupAddress, "caller is not backupAccount");
        owner = msg.sender;
        backupAddress = _backupAddress;
    }

    function updateBackupAddress(address _backupAddress) external {
        require(msg.sender == owner);
        backupAddress = _backupAddress;
    }
}
