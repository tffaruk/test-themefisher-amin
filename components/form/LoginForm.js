import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = ({ authProviders }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [type, setType] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res.status === 200) {
      router.replace("/");
      setUserInfo({ ...userInfo, email: "", password: "" });
    } else {
      setError("Try again incorrect email or password");
    }
  };
  return (
    <Grid container spacing={4} height={"80vh"}>
      <Grid
        item
        sm={6}
        sx={{
          margin: "auto",
          backgroundColor: "white",
          paddingRight: "32px",
          paddingBottom: "32px",
        }}
      >
        <Typography variant="h1">Welcome to Admin Panel</Typography>
        <Typography variant="p">
          Please enter your login credentials to access admin page
        </Typography>
        <Typography color="red" mt="10px" fontSize="12px">
          {error}
        </Typography>

        <Box noValidate sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="useremail"
              label="Email"
              name="email"
              type="email"
              autoFocus
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <Grid
              sx={{
                position: "relative",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={type ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />

              <IconButton
                onClick={() => setType(!type)}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30%",
                  width: "32px",
                }}
              >
                <FeatherIcon icon={type ? "eye-off" : "eye"} />
              </IconButton>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
