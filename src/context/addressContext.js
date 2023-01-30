import React, { createContext } from "react";
import { connect } from "../utils/connect";
import { ethers } from "ethers";
import { contract_abi, contract_address } from "../constants/config";

const AddressProvider = ({ children }) => {
  const [wallet, setWallet] = React.useState(null, {
    connected: false
  });

  const connect_wallet = async () => {
    try {
      const wallet = await connect();
      setWallet({ ...wallet, connected: true });
      return wallet;
    } catch (e) {
      console.error(e);
    }
  };

  const mint = async (uri) => {
    try {
      const { signer, address } = await connect_wallet();
      const contract = new ethers.Contract(
        contract_address,
        contract_abi,
        signer
      );

      const hasNft = await contract.hasNFT(address, uri);

      if (hasNft) {
        throw new Error("You already have this NFT");
      }

      return contract.mint(uri);
    } catch (e) {
      throw e;
    }
  };

  return (
    <AddressContext.Provider
      value={{
        ...wallet,
        connect: connect_wallet,
        mint
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const AddressContext = createContext(AddressProvider);
export default AddressProvider;
