import type { ReactNode } from "react";
import { Box, Grid } from "@mui/material";

import AuthCard from "./AuthCard";

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => (
  <Box sx={{ minHeight: "100vh" }}>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: {
              xs: "100vh",
              sm: "100vh",
              md: "100vh",
            },
          }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
