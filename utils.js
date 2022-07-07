// Helper functions to turn the data returned by the blockchain into human readable form

const getUserCollection = async (user, userFunction, copyFunction) => {
  let rawInfo = await userFunction(user);
  let parseInfo = parseUserInfo(rawInfo);
  let dataArray = [];
  // For loop
  currentBook = parseInfo.firstBook;
  while (currentBook != 0) {
    let bookInfo = await copyFunction(currentBook);
    let pBookInfo = parseBookInfo(bookInfo);
    dataArray.push(pBookInfo);
    currentBook = pBookInfo.nextLinkId;
  }
  return dataArray;
};

const parseUserInfo = (data) => {
  return {
    exists: data[0],
    bookNum: data[1].toNumber(),
    firstBook: data[2].toString(),
    lastBook: data[3].toString(),
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

module.exports = {
  parseUserInfo: parseUserInfo,
  parseBookInfo: parseBookInfo,
  getUserCollection: getUserCollection,
};
