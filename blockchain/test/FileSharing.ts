
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

const { viem } = await network.create();

describe("FileSharing Contract", function () {
  async function deployFixture() {
    const [owner, bob, charlie] =
      await viem.getWalletClients();

    const contract = await viem.deployContract("FileSharing");

    return { contract, owner, bob, charlie };
  }

  it("should register a file", async function () {
    const { contract, owner } = await deployFixture();

    await contract.write.registerFile(["bafy-test-cid"]);

    assert.equal(await contract.read.fileCount(), 1n);

    const file = await contract.read.getFile([1n], {
      account: owner.account,
    });

    assert.equal(file.owner.toLowerCase(),
      owner.account.address.toLowerCase());
    assert.equal(file.cid, "bafy-test-cid");
  });

  it("should allow the owner to grant access", async function () {
    const { contract, bob } = await deployFixture();

    await contract.write.registerFile(["bafy-test-cid"]);

    await contract.write.grantAccess(
      [1n, bob.account.address]
    );

    assert.equal(
      await contract.read.hasAccess(
        [1n, bob.account.address]
      ),
      true
    );
  });

  it("should allow the owner to revoke access", async function () {
    const { contract, bob } = await deployFixture();

    await contract.write.registerFile(["bafy-test-cid"]);

    await contract.write.grantAccess(
      [1n, bob.account.address]
    );

    await contract.write.revokeAccess(
      [1n, bob.account.address]
    );

    assert.equal(
      await contract.read.hasAccess(
        [1n, bob.account.address]
      ),
      false
    );
  });

  it("should prevent unauthorized access", async function () {
    const { contract, bob } = await deployFixture();

    await contract.write.registerFile(["bafy-test-cid"]);

    await assert.rejects(
      contract.read.getFile([1n], {
        account: bob.account,
      })
    );
  });

  it("should reject empty CIDs", async function () {
    const { contract } = await deployFixture();

    await assert.rejects(
      contract.write.registerFile([""])
    );
  });

  it("should prevent non-owners from granting access", async function () {
    const { contract, bob, charlie } =
      await deployFixture();

    await contract.write.registerFile(["bafy-test-cid"]);

    await assert.rejects(
      contract.write.grantAccess(
        [1n, charlie.account.address],
        { account: bob.account }
      )
    );
  });
});
