const ArticleToken = artifacts.require("Article");
const GreeterContract = artifacts.require("Greeter");

module.exports = function (deployer) {
  deployer.deploy(ArticleToken);
  deployer.deploy(GreeterContract);
};
