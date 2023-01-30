import React, { useContext } from "react";
import { Typography, Button, ListItem } from "@mui/material";
import { NftContext } from "../../context/nftContext";

export default function UploadImages() {
  const { file, selectFile } = useContext(NftContext);

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(e) => selectFile(e)}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      <div className="file-name">
        {file.currentFile ? file.currentFile.name : null}
      </div>

      {file.previewImage && (
        <div>
          <img
            className="preview my20"
            src={file.previewImage}
            alt=""
            style={{ maxWidth: "800px" }}
          />
        </div>
      )}

      {file.message && (
        <Typography
          variant="subtitle2"
          className={`upload-message ${file.isError ? "error" : ""}`}
        >
          {file.message}
        </Typography>
      )}

      <ul className="list-group">
        {file.imageInfos &&
          file.imageInfos.map((image, index) => (
            <ListItem divider key={index}>
              <img
                src={image.url}
                alt={image.name}
                height="80px"
                className="mr20"
              />
              <a href={image.url}>{image.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
}
