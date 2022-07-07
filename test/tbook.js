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
    const author = "0x01499d8601d246Db332E3a6397398E7d7f07ce43";
    const contract = await TBookContract.deployed();
    await contract.publish(75030, defaultWallet);
    await contract.publish(75035, author);

    let userInfo = await utils.getUserCollection(
      defaultWallet,
      contract.getUserInfo,
      contract.getCopyInfo
    );
    console.log(userInfo);
    assert(userInfo, "Info access error");
  });

  it("Test Publish ", async () => {
    const defaultWallet = "0x1B952d4C29f552318BD166065F66423f6665e2E4";
    const contract = await TBookContract.deployed();
    // await contract.publish(75035, defaultWallet);
    let price = await contract.getPrice(75035);
    let valueWei = web3.utils.toWei(price, "finney");
    let collector = "0x30e7785209b4D0f5189FEB645A3c26b88d4215E1";
    let collectedId = await contract.collect(75035, collector, {
      from: collector,
      value: valueWei,
    });
    console.log(collectedId);
    let userInfo = await utils.getUserCollection(
      collector,
      contract.getUserInfo,
      contract.getCopyInfo
    );
  });
});
