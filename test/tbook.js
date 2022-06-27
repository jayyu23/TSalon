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

    // Returns it into a human-readable form
    const parseUserInfo = (data) => {
      return {
        exists: data[0],
        bookNum: data[1].words[0],
        firstBook: data[2],
        lastBook: data[3],
      };
    };

    const parseBookInfo = (data) => {
      return {
        exists: data[0],
        tbsn: data[1],
        copyNumber: data[2],
        numTransactions: data[3],
        nextLinkId: data[4],
        prevLinkId: data[5],
        initHolder: data[6],
        currentHolder: data[7],
        lastHolder: data[8],
      };
    };

    let rawInfo = await contract.getUserInfo(defaultWallet);
    let parseInfo = parseUserInfo(rawInfo);
    let dataArray = [];
    // For loop
    currentBook = parseInfo.firstBook;
    console.log(parseInfo.firstBook);
    console.log(parseInfo.lastBook);
    while (true) {
      let bookInfo = await contract.getCopyInfo(currentBook);
      console.log(bookInfo);
      let pBookInfo = parseBookInfo(bookInfo);
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
});
