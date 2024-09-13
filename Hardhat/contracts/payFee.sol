// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AccessControl {

    // Owner of the contract
    address public owner;

    // Mapping to track addresses that have paid
    mapping(address => bool) public hasAccess;

    // Payment amount required to access (0.01 Sepolia ETH)
    uint256 public constant ACCESS_FEE = 0.01 ether;

    // Events
    event AccessGranted(address indexed user, uint256 amount);

    // Constructor sets the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict functions to owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    // Function to pay for access
    function payForAccess() external payable {
        require(msg.value == ACCESS_FEE, "Incorrect payment. 0.01 ETH required.");
        require(!hasAccess[msg.sender], "You already have access.");

        // Grant access
        hasAccess[msg.sender] = true;

        // Emit the event
        emit AccessGranted(msg.sender, msg.value);
    }

    // Function for the owner to withdraw funds from the contract
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Check if an address has access
    function checkAccess(address _user) external view returns (bool) {
        return hasAccess[_user];
    }
}
