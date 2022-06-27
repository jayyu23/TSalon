const TBookContract = artifacts.require("TBookFactory");

module.exports = function (deployer) {
  deployer.deploy(TBookContract);
};
