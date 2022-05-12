// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Article is Ownable, ERC721 {
    struct Metadata {
        string id;
        string title;
        string author_name;
        string content_url;
    }
    string private _currentBaseURI;
    string articleName = "Test";
    string subTitle = "";
    
    constructor() ERC721("Article", "ARTICLE") {   
        _currentBaseURI = "http://localhost/token/";
    }

    function getName() public view returns (string memory){
        return articleName;
    }

    
    
}