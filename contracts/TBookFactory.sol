// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBookFactory is Ownable, ERC721 {
    // A Copy of a Book
    struct CopyInfo {
        bool exists;
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
        bool exists;
        uint256 tbsn;
        uint256 numCopies; // Max 10 ** 12 copies
        uint256 mintPrice;
        address payable author;
        mapping(address => uint256) collectors;
    }

    // A Single User
    struct UserInfo {
        bool exists;
        address userAddress;
        uint256 collectionSize;
        mapping(uint256 => uint256) books; // Maps TBSN to whether the number of copies the user has collected.
    }

    uint256 private _numUsers;
    mapping(address => UserInfo) private _addressToUser;

    // This ID is the NFT ID, is completely seperate from TBSN and Copy Number
    mapping(uint256 => CopyInfo) private _idToCopy;

    // Maps TBSN to TBook Info
    mapping(uint256 => TBookInfo) private _tbsnToBook;

    uint256 private _totalCopies;

    // Max copies of a single TBook
    uint256 private _maxCopies;

    constructor() ERC721("TBook", "TBK") {
        _numUsers = 0;
        _totalCopies = 0;
        _maxCopies = 10**9;
    }

    /**
    Gets the ID from the TBSN and the Copy Number
    Copy 1 of 75025 would be 75025000000001
     */
    function getId(uint256 tbsn, uint256 copyNumber)
        internal
        view
        returns (uint256)
    {
        uint256 id = tbsn * (_maxCopies);
        id += copyNumber;
        return id;
    }

    function tbsnFromId(uint256 id) public view returns (uint256) {
        return id / _maxCopies;
    }

    function copyNumberFromId(uint256 id) public view returns (uint256) {
        return id % _maxCopies;
    }

    function mint(uint256 tbsn, address mintAddress) public {
        require(_tbsnToBook[tbsn].exists);
        uint256 currentCopy = _tbsnToBook[tbsn].numCopies;

        // Generate the ID from the TBSN + Copy Number
        uint256 id = getId(tbsn, currentCopy);

        // Update CopyInfo
        _idToCopy[id].exists = true;
        _idToCopy[id].tbsn = tbsn;
        _idToCopy[id].copyNumber = currentCopy;
        _idToCopy[id].initHolder = mintAddress;
        _idToCopy[id].currentHolder = mintAddress;

        // Update UserInfo
        if (!_addressToUser[mintAddress].exists) {
            _addressToUser[mintAddress].exists = true;
            _addressToUser[mintAddress].userAddress = mintAddress;
        }
        _addressToUser[mintAddress].books[tbsn] += 1;
        _addressToUser[mintAddress].collectionSize += 1;

        // Update BookInfo
        _tbsnToBook[tbsn].numCopies += 1;
        _tbsnToBook[tbsn].collectors[mintAddress] += 1;
        _safeMint(msg.sender, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        uint256 tbsn = tbsnFromId(tokenId);
        require(
            (_tbsnToBook[tbsn].collectors[from] > 0) &&
                (_addressToUser[from].books[tbsn] > 0)
        );

        // Update CopyInfo
        _idToCopy[tokenId].lastHolder = from;
        _idToCopy[tokenId].currentHolder = to;
        _idToCopy[tokenId].numTransactions += 1;

        // Update TBookInfo
        _tbsnToBook[tbsn].collectors[from] -= 1;
        _tbsnToBook[tbsn].collectors[to] += 1;

        // Update UserInfo
        _addressToUser[from].books[tbsn] -= 1;
        _addressToUser[from].collectionSize -= 1;

        _addressToUser[to].books[tbsn] += 1;
        _addressToUser[to].collectionSize += 1;
        _safeTransfer(from, to, tokenId, " ");
    }

    function publish(uint256 tbsn, address payable author) external {
        // Only the Foundation can Publish
        require(msg.sender == owner());
        // Update BookInfo
        _tbsnToBook[tbsn].exists = true;
        _tbsnToBook[tbsn].author = author;
        // Free mint for the author
        mint(tbsn, author);
    }
}
