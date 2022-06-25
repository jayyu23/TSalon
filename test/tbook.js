const TBookContract = artifacts.require("TBookFactory.sol");

contract("TBookFactory", () => {
  it("has been deployed successfully", async () => {
    const contract = await TBookContract.deployed();
    assert(contract, "Contract not deployed");

    await contract.publish(75025, "0xb1944fdc36962958b471aCeD0699ADbad3B39D1e");
    expected = 1;
    actual = await contract.getTotalCopies();
    assert.equal(expected, actual, "Not Published right.");

    actual = await contract.getOwnerOf(75025000000000);
    expected = "0xb1944fdc36962958b471aCeD0699ADbad3B39D1e";
    assert.equal(expected, actual, "Owner matches");
  });
});
