// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Article is Ownable, ERC721 {
    struct Metadata {
        string title;
        string author_name;
        string content_url;
    }
    mapping(uint256 => Metadata) id_map;

    string private _currentBaseURI;
    uint256 numTokens = 0;
    
    constructor() ERC721("Article", "ARTICLE") {   
        _currentBaseURI = "http://localhost/token/";
    }

    function claim(string memory title, string memory author_name, string memory content_url) external {
        uint tokenId = numTokens;
        id_map[tokenId] = Metadata(title, author_name, content_url);
        numTokens++;
        _safeMint(msg.sender, tokenId);
    }
    
}