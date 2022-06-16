// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBookFactory is Ownable, ERC721 {
    constructor() ERC721("TBook", "TBK") {}
}
