const utils = require("../utils.js");
const web3 = require("web3");
const TBookContract = artifacts.require("TBookFactory.sol");

contract("TBookFactory", () => {
  it("has been deployed successfully", async () => {
    const contract = await TBookContract.deployed();
    assert(contract, "Contract not deployed");
  });

  it("Test publish and get user collection in a list", async () => {
    const defaultWallet = "0x1B952d4C29f552318BD166065F66423f6665e2E4";
    const contract = await TBookContract.deployed();
    await contract.publish(75030, defaultWallet);
    await contract.publish(75031, defaultWallet);
    await contract.publish(75035, defaultWallet);

    let rawInfo = await contract.getUserInfo(defaultWallet);
    let parseInfo = utils.parseUserInfo(rawInfo);
    let dataArray = [];
    // For loop
    currentBook = parseInfo.firstBook;
    console.log(parseInfo.firstBook);
    console.log(parseInfo.lastBook);
    while (true) {
      let bookInfo = await contract.getCopyInfo(currentBook);
      console.log(bookInfo);
      let pBookInfo = utils.parseBookInfo(bookInfo);
      dataArray.push(pBookInfo);
      currentBook = pBookInfo.nextLinkId;
      console.log(currentBook);
      if (currentBook == 0) {
        break;
      }
    }
    console.log(dataArray);
    assert(dataArray, "Info access error");
  });

  it("Test Publish ", async () => {
    const defaultWallet = "0x1B952d4C29f552318BD166065F66423f6665e2E4";
    const contract = await TBookContract.deployed();
    await contract.publish(75035, defaultWallet);
    let price = await contract.getPrice(75035);
    let valueWei = web3.utils.toWei(price, "finney");
    let collector = "0x30e7785209b4D0f5189FEB645A3c26b88d4215E1";
    await contract.collect(75035, collector, {
      from: collector,
      value: valueWei,
    });

    let rawUser = await contract.getUserInfo(collector);
    let parseUser = utils.parseUserInfo(rawUser);
    console.log(parseUser);
  });
});
