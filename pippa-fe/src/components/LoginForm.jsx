import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Stack from '@mui/material/Stack';

import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

export default function LoginForm(props) {

  const avatarStyle = { backgroundColor: "#9c27b0" };
  const btnstyle = { margin: "8px 0" };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordInputChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  function loginOnSubmit(event) {
    // event.preventDefault();
    console.log(username);
    console.log(password);
    props.onLogin({ username, password });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* <Paper elevation={10} style={paperStyle}> */}
      <Grid align="center" sx={{ width: 300 }}>
        <Stack spacing={1} alignItems="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <Typography variant="h4" color="primary" sx={{ p: 3 }}>
            Sign In
          </Typography>
          <TextField
            sx={{ m: 1 }}
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            onChange={usernameInputChangeHandler}
          />
          <TextField
            sx={{ m: 1 }}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={passwordInputChangeHandler}
          />
          <Button
            sx={{ p: 1 }}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={loginOnSubmit}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
        </Stack>
      </Grid>

      {/* </Paper> */}
    </div>
  );
}