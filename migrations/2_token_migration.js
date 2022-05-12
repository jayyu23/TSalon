const ArticleToken = artifacts.require("Article");

module.exports = function (deployer) {
  deployer.deploy(ArticleToken);
};
