// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13<0.9.0;

import {LibPlant, PlantInfo} from "../libraries/LibPlant.sol";
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibStrings} from "../../shared/libraries/LibStrings.sol";
import {AppStorage, Modifiers} from "../libraries/LibAppStorage.sol";
//import "../libraries/LibAppStorage.sol";

contract PlantFacet is Modifiers {

    // Constants, public variables
    uint256 constant MAX_SUPPLY = 111; // max number of tokens

    // Events
    event PlantsCreated(uint indexed tokenId);

    // Mint new Plants of Art
    function mintPlantsOfArt(uint tokenId) external payable {
        // Require token ID to be between 1 and maxSupply (111)
        require(tokenId > 0 && tokenId <= MAX_SUPPLY, "Token ID invalid");

        // Make sure the amount of ETH is equal or larger than the minimum mint price
        require(msg.value >= s.mintPrice, "Not enough ETH sent");

        uint randomSeed1 = uint(
            keccak256(abi.encodePacked(block.basefee, block.timestamp))
        );
        uint randomSeed2 = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        uint randomSeed3 = uint(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        );

        s.tokenIdToSvg[tokenId] = LibPlant.generateFinalSvg(
            randomSeed1,
            randomSeed2,
            randomSeed3
        );

        // Mint token
        _mint(msg.sender, tokenId);

        // Increase minted tokens counter
        ++s.totalSupply;

        emit PlantsCreated(tokenId);
    }

    // Withdraw funds from the contract
    function withdraw() external onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

}