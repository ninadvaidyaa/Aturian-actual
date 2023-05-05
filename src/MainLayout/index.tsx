import { Box, Grid, Toolbar, useMediaQuery } from "@mui/material";
import MainDrawer from "MainLayout/Drawer";
import Header from "MainLayout/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import useConfig from "hooks/useConfig";
import { LAYOUT_CONST } from "types/config";
import { useTheme } from "@mui/material/styles";
import BasicBreadcrumbs from "components/@extended/Breadcrumbs";
import { breadCrumbsArrayStore } from "hooks/useBreadCrumbs";
import { menuStore } from "hooks/useNavBar";
import InfoIcon from "@mui/icons-material/Info";

function MainLayout(): JSX.Element {
  const { menuOrientation } = useConfig();
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(true);

  const breadCrumbsArray = breadCrumbsArrayStore(
    (state: { breadCrumbsArray: any }) => state.breadCrumbsArray
  );
  const openDrawer = menuStore(
    (state: { openDrawer: any }) => state.openDrawer
  );

  const isHorizontal =
    menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;
  const handleDrawerToggle = () => {
    setOpen(!open);
    openDrawer(!open);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainDrawer open={open} />

      <Box
        component="main"
        bgcolor={theme.palette.grey[100]}
        sx={{
          width: "calc(100% - 260px)",
          flexGrow: 1,
          p: { xs: 2, sm: "0", sx: "0" },
        }}
      >
        <Toolbar
          sx={{
            mt: isHorizontal ? 8 : "inherit",
            minHeight: theme.spacing(7.5),
          }}
        />
        <Box
          sx={{
            padding: {
              xl: theme.spacing(3),
              xs: theme.spacing(3),
              sm: theme.spacing(3),
            },
            ...{ px: { xs: 0, sm: 3 } },
            position: "relative",
            minHeight: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <BasicBreadcrumbs links={breadCrumbsArray} />
            </Grid>
            <Grid
              item
              display="flex"
              alignItems="center"
            >
              <InfoIcon />
            </Grid>
          </Grid>

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
