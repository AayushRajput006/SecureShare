
import { network } from "hardhat";

const { viem } = await network.create();

async function main() {
  console.log("Deploying FileSharing contract...");

  const contract = await viem.deployContract("FileSharing");

  console.log("FileSharing deployed successfully!");
  console.log("Contract address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
