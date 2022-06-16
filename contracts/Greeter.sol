// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.13;

contract Greeter is Ownable {
    string private _greeting = "Hello, World!";
    address private _owner;

    function greet() external view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }
}
