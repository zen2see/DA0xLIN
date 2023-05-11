// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13<0.9.0;
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {ILink} from "../interfaces/ILink.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

struct Plant {
    uint256 x; // x coordinates of the top left corner
    uint256 y; // y coordinates of the top left corner
    uint256 width;
    uint256 height;
    string fill; // ball color
    uint256 randomSeed;
}

struct ERC1155Listing {
    uint256 listingId;
    address seller;
    address erc1155TokenAddress;
    uint256 erc1155TypeId;
    uint256 quantity;
    uint256 priceInWei;
    uint256 timeCreated;
    uint256 timeLastPurchased;
    uint256 sourceListingId;
    bool sold;
    bool cancelled;
}

struct ERC721Listing {
    uint256 listingId;
    address seller;
    address erc721TokenAddress;
    uint256 erc721TokenId;
    uint256 priceInWei;
    uint256 timeCreated;
    uint256 timePurchased;
    bool cancelled;
}

struct AppStorage {
    mapping(uint256 => string) tokenIdToSvg; // Mapping to store SVG code for each token
    mapping(uint256 => Plant) plants;
    string name;
    string symbol;
    bytes32 domainSeparator;
    // VRF
    bytes32 keyHash;
    uint144 fee;
    address vrfCoordinator;
    ILink link;
    address owner;
    uint256 totalSupply; // number of tokens minted
    uint256 mintPrice;
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function abs(int256 x) internal pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }
}

contract Modifiers {
    AppStorage internal s;
    modifier onlyTokenOwner(uint256 _tokenId) {
        require(LibMeta.msgSender() == s.plants[_tokenId].owner, "LibAppStorage: Only plant owner can call this function");
        _;
    }
    
    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    // modifier onlyDao() {
    //     address sender = LibMeta.msgSender();
    //     require(sender == s.dao, "Only DAO can call this function");
    //     _;
    // }

    // modifier onlyDaoOrOwner() {
    //     address sender = LibMeta.msgSender();
    //     require(sender == s.dao || sender == LibDiamond.contractOwner(), "LibAppStorage: Do not have access");
    //     _;
    // }
}