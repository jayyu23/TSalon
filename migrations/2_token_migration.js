const GreeterContract = artifacts.require("Greeter");
const TBookContract = artifacts.require("TBookFactory");

module.exports = function (deployer) {
  deployer.deploy(GreeterContract);
  deployer.deploy(TBookContract);
};
