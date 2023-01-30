export const contract_address = "0xc07F5602B6b730c6d7e10FaFc0ABdA146F90752b";
export const contract_abi = [
  "function mint(string memory _uri) returns (uint)",
  "function totalSupply() view returns (uint256)",
  "function tokenURI(uint tokenId) view returns (string)",
  "function hasNFT(address user, string name) view returns (bool)"
];

export const emptyFile = {
  currentFile: undefined,
  previewImage: undefined,
  progress: 0,
  message: "",
  imageInfos: []
};

//found in minted works table
export const assetTableColumns = ["Title", "IPFS Link", "Creator"];
