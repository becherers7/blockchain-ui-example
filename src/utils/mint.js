import { ethers } from "ethers";
import { connect } from "./connect";
import { contract_abi, contract_address } from "constants/config";

export const mint = async (uri) => {
  const { signer, address } = await connect();
  const contract = new ethers.Contract(contract_address, contract_abi, signer);
  return contract.mint(uri);
};

export const tokenURI = async (tokenId) => {
  const { signer, address } = await connect();
  const contract = new ethers.Contract(contract_address, contract_abi, signer);
  return contract.tokenURI(tokenId);
};
