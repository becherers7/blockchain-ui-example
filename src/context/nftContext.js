import React, { createContext, useContext, useState } from "react";
import { emptyFile } from "../constants/config";
import {
  saveJSONToIpfs,
  saveFileToIpfs,
  getIpfsPins
} from "../services/pinata.service";
import authService from "../services/auth.service";
import { AddressContext } from "./addressContext";
import { image_base_uri } from "../constants/strings";

const NftProvider = ({ children }) => {
  const { mint } = useContext(AddressContext);
  const [file, setFile] = useState({ ...emptyFile });

  const findIpfsPins = async () => {
    const ipfsPins = await getIpfsPins();
    return ipfsPins;
  };

  const selectFile = (event) => {
    setFile({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ""
    });
  };

  const submitNft = async (data) => {
    const creator = authService.getCurrentUser().username;
    //save image asset to pinata
    const ipfsImageResponse = await saveFileToIpfs(file.currentFile, creator);

    const imageUrl = image_base_uri + ipfsImageResponse.data.ipfsHash;

    // //get hash of token structure
    const ipfsTokenURI = await saveJSONToIpfs({
      name: data.name,
      description: data.description,
      image: imageUrl //use pinata URI of asset for pointing to asset
    });
    const metadataHash = ipfsTokenURI.data.response.IpfsHash;

    //smart contract prepends uri base ipfs://
    const wallet = await mint(metadataHash);
    return wallet;
  };

  const resetFile = () => {
    setFile({ ...emptyFile });
    return;
  };

  return (
    <NftContext.Provider
      value={{
        file: file,
        findIpfsPins,
        resetFile,
        selectFile,
        submitNft
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const NftContext = createContext(NftProvider);
export default NftProvider;
