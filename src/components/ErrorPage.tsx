import { useNavigate, useRouteError } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  useQueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useTableActions } from "hooks/useTable";
import { type AxiosError } from "axios";

function ErrorPage() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const error = useRouteError() as Error | AxiosError;
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  const action = useTableActions();
  const queryClient = useQueryClient();
  const resetErrors = () => {
    queryClient.clear();
    queryClient.removeQueries();
    reset();
    action.reset(); // TODO: find better way to handle it
    navigate("/");
  };
  
  useEffect(() => {
    reset();
  }, []);
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "calc(100vh - 250px)" }}
      >
        <Grid
          item
          xs={12}
        ></Grid>
        <Grid
          item
          xs={12}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              align="center"
              variant={matchDownSM ? "h2" : "h1"}
            >
                {/* @ts-expect-error it can be network error */}
              <i>{error?.statusText || error?.message}</i>
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              align="center"
              sx={{ width: { xs: "73%", sm: "70%" }, mt: 1 }}
            >
              Server error. We fixing the problem. please try again at a later
              stage.
            </Typography>
            <button
              type="button"
              className="inline-flex text-skin-primary bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
              onClick={() => {
                resetErrors();
              }}
            >
              Back To Home
            </button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ErrorPage;
