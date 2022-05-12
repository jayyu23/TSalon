var Article = artifacts.require("./Article.sol");
contract("Article", function (accounts) {
    var articleInstance;
    it("has a name of Test", function () {
        return Article.deployed().then(function(instance) {
            return instance.getName();
        }).then(function (name) {
            assert.equal(name, "Test");
        })
    })
})