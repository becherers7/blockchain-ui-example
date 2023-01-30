import {
  Box,
  createTheme,
  CircularProgress,
  Grid,
  ThemeProvider,
  createStyles,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

export const useStyles = makeStyles((theme) =>
  createStyles({
    rotateIcon: {
      animation: "spin 4s linear infinite"
    },
    root: {
      color: theme.palette.red
    }
  })
);

export default function LoadingScreen() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Typography variant="subtitle1">
              This might take a moment
            </Typography>
            <Box position="relative" display="inline-flex">
              <CircularProgress size={90} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
