import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Blockchain Portfolio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter a username."),
    email: Yup.string()
      .required("Please enter an email.")
      .email("Invalid email type."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password.")
      .oneOf(
        [Yup.ref("password"), null],
        "Passwords don't match. Please try again!"
      ),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Please accept the terms and conditions to continue!"
    )
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      () => {
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  {...register("username")}
                  error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.username?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.confirmPassword?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      control={control}
                      name="acceptTerms"
                      defaultValue="false"
                      inputRef={register()}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          color="primary"
                          onChange={(e) => onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label={
                    <Typography
                      color={errors.acceptTerms ? "error" : "inherit"}
                    >
                      I have read and agreed to the Terms *
                    </Typography>
                  }
                />
                <br />
                <Typography variant="inherit" color="textSecondary">
                  {errors.acceptTerms
                    ? "(" + errors.acceptTerms.message + ")"
                    : ""}
                </Typography>
              </Grid>
            </Grid>

            {message && (
              <Typography variant="inherit" color="error">
                {message}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
