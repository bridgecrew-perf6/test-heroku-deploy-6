import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const { signUp, error, setError } = useContext(authContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleValues() {
    {
      if (!email || !password) {
        alert("Please fill all the fields");
        return;
      }
    }
    signUp(email, password, navigate);
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent="center"
      height={"40vh"}>
      <Typography variant="h4" component="h2">
        Sign Up
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "40%", margin: "10px" }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />

      <TextField
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "40%", margin: "10px" }}
        id="outlined-basic"
        label="Password"
        variant="outlined"
      />

      <Button
        onClick={handleValues}
        style={{ width: "40%", margin: "10px" }}
        variant="contained">
        Sign Up
      </Button>

      <Typography variant="p" component="h2">
        Have you already registered?{" "}
      </Typography>
      <Typography
        onClick={() => {
          navigate("/login");
          setError("");
        }}
        variant="p"
        color={"primary"}
        component="h2"
        style={{ textDecoration: "none" }}>
        Log in here
      </Typography>
    </Box>
  );
};

export default SignUpForm;
