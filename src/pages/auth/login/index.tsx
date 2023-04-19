import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useStore } from "zustand";

import { loginApi } from "api/authApi";
import type { LoginFormData } from "validators/auth.validators";
import { tokenStore, refreshTokenStore } from "hooks/useAuth";
import AuthWrapper from "../AuthWrapper";
import LoginForm from "./loginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navigateTo = searchParams.get("next");
  const { token, setToken } = useStore(tokenStore);
  const { setTokenRefresh } = useStore(refreshTokenStore);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      if (navigateTo) {
        navigate(navigateTo);
      } else {
        navigate("/");
      }
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    try {
      const resp = await loginApi(data);
      if (resp.statusText === "OK") {
        setError(false);
        setToken(resp.data.access_token);
        setTokenRefresh(resp.data.refresh_token);
        if (navigateTo) {
          navigate(navigateTo);
        } else {
          navigate("/");
        }
      }
    } catch (e) {
      setError(true);
    }
  };
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {error && (
            <Typography variant="body1" color="error" textAlign="center">
              username or password is incorrect{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <LoginForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default LoginPage;
