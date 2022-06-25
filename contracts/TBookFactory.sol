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

    uint256 numUsers;
    mapping(address => UserInfo) addressToUser;

    // This ID is the NFT ID, is completely seperate from TBSN and Copy Number
    mapping(uint256 => CopyInfo) idToCopy;

    // Maps TBSN to TBook Info
    mapping(uint256 => TBookInfo) tbsnToBook;

    uint256 totalCopies;

    // Max copies of a single TBook
    uint256 private _maxCopies;

    constructor() ERC721("TBook", "TBK") {
        _maxCopies = 10**9;
    }

    // -------- Test functions -----------
    function getOwnerOf(uint256 tokenId) public view returns (address) {
        return idToCopy[tokenId].currentHolder;
    }

    // -----------------------------------

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
        require(tbsnToBook[tbsn].exists);
        uint256 currentCopy = tbsnToBook[tbsn].numCopies;

        // Generate the ID from the TBSN + Copy Number
        uint256 id = getId(tbsn, currentCopy);

        // Update CopyInfo
        idToCopy[id].exists = true;
        idToCopy[id].tbsn = tbsn;
        idToCopy[id].copyNumber = currentCopy;
        idToCopy[id].initHolder = mintAddress;
        idToCopy[id].currentHolder = mintAddress;

        // Update UserInfo
        if (!addressToUser[mintAddress].exists) {
            addressToUser[mintAddress].exists = true;
            addressToUser[mintAddress].userAddress = mintAddress;
        }
        addressToUser[mintAddress].books[tbsn] += 1;
        addressToUser[mintAddress].collectionSize += 1;

        // Update BookInfo
        tbsnToBook[tbsn].numCopies += 1;
        tbsnToBook[tbsn].collectors[mintAddress] += 1;

        totalCopies += 1;
        _safeMint(msg.sender, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        uint256 tbsn = tbsnFromId(tokenId);
        require(
            (tbsnToBook[tbsn].collectors[from] > 0) &&
                (addressToUser[from].books[tbsn] > 0)
        );

        // Update CopyInfo
        idToCopy[tokenId].lastHolder = from;
        idToCopy[tokenId].currentHolder = to;
        idToCopy[tokenId].numTransactions += 1;

        // Update TBookInfo
        tbsnToBook[tbsn].collectors[from] -= 1;
        tbsnToBook[tbsn].collectors[to] += 1;

        // Update UserInfo
        addressToUser[from].books[tbsn] -= 1;
        addressToUser[from].collectionSize -= 1;

        addressToUser[to].books[tbsn] += 1;
        addressToUser[to].collectionSize += 1;
        _safeTransfer(from, to, tokenId, " ");
    }

    function publish(uint256 tbsn, address payable author) external {
        // Only the Foundation can Publish
        require(msg.sender == owner());
        // Update BookInfo
        tbsnToBook[tbsn].exists = true;
        tbsnToBook[tbsn].author = author;
        // Free mint for the author
        mint(tbsn, author);
    }
}
