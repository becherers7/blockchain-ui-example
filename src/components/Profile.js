import React from "react";
import AuthService from "../services/auth.service";
import { Container } from "@mui/material";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Container>
      <h3>
        <strong>{currentUser.username}</strong> Profile
      </h3>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </Container>
  );
};

export default Profile;
