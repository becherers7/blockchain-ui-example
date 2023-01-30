import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
  Container
} from "@mui/material";

import { assetTableColumns } from "../constants/config";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../common/Toast";
import { NftContext } from "../context/nftContext";
import { asset_table_header, has_pins, no_pins } from "../constants/strings";

const AssetTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { findIpfsPins } = useContext(NftContext);
  const [pins, setIpfsPins] = useState([]);

  useEffect(() => {
    findIpfsPins().then((results) => {
      setIpfsPins(results.data.data);
    });
  }, []);

  return (
    <Container maxWidth="md">
      {location.state && <Toast message={location.state.message} />}
      <Box mt={3} mb={3}>
        <Typography variant="h4">{asset_table_header}</Typography>
      </Box>
      <Box mb={3}>
        <Typography>{pins.length === 0 ? no_pins : has_pins}</Typography>
      </Box>
      <Box mb={3}>
        <Table>
          <TableHead>
            <TableRow>
              {assetTableColumns.map((c) => (
                <TableCell key={c}>{c}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pins.length > 0 && (
              <>
                {pins.map((pin, i) => (
                  <TableRow key={i}>
                    <TableCell>{pin.fileName}</TableCell>
                    <TableCell>
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${pin.hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {pin.hash}
                      </a>
                    </TableCell>
                    <TableCell>{pin.creator}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Box>
      <Box mb={3}>
        <Button variant="contained" onClick={() => navigate("/create-nft")}>
          Create NFT
        </Button>
      </Box>
    </Container>
  );
};

export default AssetTable;
