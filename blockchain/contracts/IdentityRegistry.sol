// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IdentityRegistry {
    struct Identity { bytes32 didHash; address wallet; uint256 createdAt; bool active; }
    mapping(address => Identity) public identities;
    event IdentityRegistered(address indexed wallet, bytes32 indexed didHash, uint256 createdAt);

    function registerIdentity(bytes32 didHash) external {
        require(identities[msg.sender].wallet == address(0), "Identity already registered");
        identities[msg.sender] = Identity(didHash, msg.sender, block.timestamp, true);
        emit IdentityRegistered(msg.sender, didHash, block.timestamp);
    }

    function isRegistered(address wallet) external view returns (bool) {
        return identities[wallet].wallet != address(0) && identities[wallet].active;
    }
}
