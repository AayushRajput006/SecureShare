
import { BrowserProvider, Contract } from "ethers";
import FileSharingArtifact from "../contracts/FileSharing.json";

const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS;

const CHAIN_ID = 31337n;

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask");
  }

  const provider = new BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const network = await provider.getNetwork();

  if (network.chainId !== CHAIN_ID) {
    throw new Error("Switch to Hardhat Local network");
  }

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

export async function getContract() {
  const { provider, signer } = await connectWallet();

  const code = await provider.getCode(CONTRACT_ADDRESS);

  if (code === "0x") {
    throw new Error("Contract not found on this network");
  }

  return new Contract(
    CONTRACT_ADDRESS,
    FileSharingArtifact.abi,
    signer
  );
}

export async function registerFile(cid) {
  if (!cid?.trim()) {
    throw new Error("CID cannot be empty");
  }

  const contract = await getContract();

  const tx = await contract.registerFile(cid.trim());

  return await tx.wait();
}

export async function grantAccess(fileId, recipient) {
  const contract = await getContract();

  const tx = await contract.grantAccess(
    BigInt(fileId),
    recipient
  );

  return await tx.wait();
}

export async function revokeAccess(fileId, recipient) {
  const contract = await getContract();

  const tx = await contract.revokeAccess(
    BigInt(fileId),
    recipient
  );

  return await tx.wait();
}



export async function getFileCount() {
  const contract = await getContract();
  return Number(await contract.fileCount());
}

export async function getFileDetails(fileId) {
  const contract = await getContract();
  const file = await contract.getFile(BigInt(fileId));

  return {
    owner: file.owner,
    cid: file.cid,
    uploadedAt: new Date(
      Number(file.uploadedAt) * 1000
    ).toLocaleString(),
    active: file.active
  };
}

export async function checkFileAccess(fileId, address) {
  const contract = await getContract();

  return await contract.hasAccess(
    BigInt(fileId),
    address
  );
}
