// Helper functions to turn the data returned by the blockchain into human readable form

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

module.exports = { parseUserInfo: parseUserInfo, parseBookInfo: parseBookInfo };
