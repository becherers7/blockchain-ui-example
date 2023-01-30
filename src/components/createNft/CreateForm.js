import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import UploadImages from "./uploadImages";
import { Container } from "@mui/system";

const CreateForm = (props) => {
  const { errors, handleSubmit, register, submitForm } = props;

  return (
    <Container>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Box mb={4} mt={5}>
          <Typography variant="h4">Create an NFT!</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              name="name"
              {...register("name")}
              placeholder="Enter NFT title"
              fullWidth
              label="NFT Name"
              error={errors.name ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.name?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Description"
              id="description"
              name="description"
              placeholder="Enter NFT description"
              {...register("description")}
              error={errors.description ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.description?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <UploadImages />
          </Grid>
        </Grid>
        <Box mb={3}>
          <Grid container>
            <Grid item>
              <Button
                type="submt"
                variant="contained"
                onClick={handleSubmit(submitForm)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateForm;
