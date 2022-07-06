// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TBookFactory is Ownable, ERC721 {
    // A Copy of a Book
    struct CopyInfo {
        // Basics
        bool exists;
        uint256 tbsn;
        uint256 copyNumber;
        uint256 numTransactions; // How many times sold/transacted
        // Linked List info;
        uint256 nextLinkId;
        uint256 prevLinkId;
        // Holder Info
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
        mapping(uint256 => uint256) bookToCopies; // Maps TBSN to whether the number of copies the user has collected.
        // LinkedList Info
        uint256 firstLinkId;
        uint256 lastLinkId;
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
        public
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

    // Mint a copy of the book
    function mint(uint256 tbsn, address mintAddress) internal {
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
            // Init userInfo
            addressToUser[mintAddress].exists = true;
            addressToUser[mintAddress].userAddress = mintAddress;
            addressToUser[mintAddress].firstLinkId = id;
        }

        // Update the LinkedList
        bool hasCollected = addressToUser[mintAddress].collectionSize != 0;
        if (hasCollected) {
            uint256 lastLink = addressToUser[mintAddress].lastLinkId;
            idToCopy[lastLink].nextLinkId = id;
            idToCopy[id].prevLinkId = lastLink;
        }
        addressToUser[mintAddress].lastLinkId = id;
        addressToUser[mintAddress].bookToCopies[tbsn]++;
        addressToUser[mintAddress].collectionSize++;

        // Update BookInfo
        tbsnToBook[tbsn].numCopies++;
        tbsnToBook[tbsn].collectors[mintAddress]++;

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
                (addressToUser[from].bookToCopies[tbsn] > 0)
        );

        // Update CopyInfo
        idToCopy[tokenId].lastHolder = from;
        idToCopy[tokenId].currentHolder = to;
        idToCopy[tokenId].numTransactions += 1;

        // Update TBookInfo
        tbsnToBook[tbsn].collectors[from] -= 1;
        tbsnToBook[tbsn].collectors[to] += 1;

        // Update UserInfo
        addressToUser[from].bookToCopies[tbsn] -= 1;
        addressToUser[from].collectionSize -= 1;

        addressToUser[to].bookToCopies[tbsn]++;
        addressToUser[to].collectionSize += 1;
        // TODO: Handle Linked List Stuff
        _safeTransfer(from, to, tokenId, " ");
    }

    function getPrice(uint256 tbsn) public view returns (uint256) {
        uint256 floor = 10;
        uint256 step = 50;
        uint256 copies = tbsnToBook[tbsn].numCopies;
        uint256 power = copies / step;
        return floor * (2**power); // returns in finneys
    }

    function collect(uint256 tbsn, address collector) public payable {
        // Check if tbsn exists
        require(tbsnToBook[tbsn].exists, "Book doesn't exist");

        uint256 priceWei = getPrice(tbsn) * (10**15); // convert to Wei
        require(
            msg.value >= priceWei,
            "Insufficient funds. Please check price."
        );
        uint256 authorPay = (priceWei * 80) / 100;
        uint256 platformPay = priceWei - authorPay;
        address payable author = tbsnToBook[tbsn].author;
        mint(tbsn, collector);
        author.transfer(authorPay);
        payable(owner()).transfer(platformPay);
    }

    function publish(uint256 tbsn, address payable author) external {
        // Use an oracle to check that this is a valid call with correct author (valid tbsn)
        // TODO

        // Only the Foundation can Publish
        // require(msg.sender == owner());
        // Update BookInfo
        tbsnToBook[tbsn].exists = true;
        tbsnToBook[tbsn].author = author;
        // Free mint for the author
        mint(tbsn, author);
    }

    // ----------------------------
    // Public Gets
    // Can use this in order to iterate through an entire user's collection
    function getCopyInfo(uint256 id) external view returns (CopyInfo memory) {
        return idToCopy[id];
    }

    function getUserInfo(address userAddress)
        public
        view
        returns (
            bool,
            uint256,
            string memory,
            string memory
        )
    {
        UserInfo storage info = addressToUser[userAddress];
        return (
            info.exists,
            info.collectionSize,
            Strings.toString(info.firstLinkId),
            Strings.toString(info.lastLinkId)
        );
    }
}
