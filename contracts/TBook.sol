// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBookFactory is Ownable, ERC721 {
    // A Copy of a Book
    struct CopyInfo {
        uint256 tbsn;
        uint256 copyNumber;
        uint256 numTransactions; // How many times sold/transacted
        string title;
        address initHolder; // Who minted this
        address currentHolder;
        address lastHolder; // Who was the last person to hold this NFT
    }
    // A Single Book
    struct TBookInfo {
        uint256 tbsn;
        string title;
        uint256 numCopies;
        uint256 mintPrice;
        address author;
        mapping(address => CopyInfo) addressToCopy; // Maps the holder to the copy
        mapping(uint256 => address) copyToAddress; // Maps copy number back to the address
    }
    // A Collection of Books
    struct TBookCollection {
        string collectionName; // Optional descriptor
        uint256 collectionSize;
        mapping(uint256 => TBookInfo) books; // Maps TBSN to TBookInfo struct (which in turn maps to copyHolders info)
    }
    // A Single User
    struct UserInfo {
        address userAddress;
        uint256 balance;
        string userName;
        TBookCollection books;
    }

    uint256 numUsers;
    mapping(address => UserInfo) allUsers;

    TBookCollection allBooks;

    constructor() ERC721("TBook", "TBK") {}
}
