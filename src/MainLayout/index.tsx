import { Box, Grid } from "@mui/material";
import MainDrawer from "MainLayout/Drawer";
import Header from "MainLayout/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import BasicBreadcrumbs from "components/@extended/Breadcrumbs";
import { breadCrumbsArrayStore } from "hooks/useBreadCrumbs";
import { menuStore } from "hooks/useNavBar";
import InfoIcon from "@mui/icons-material/Info";
import { NAV_HEIGHT } from "config";
/* NAV_HEIGHT is used in main tag height calculation */


function MainLayout(): JSX.Element {
  const [open, setOpen] = useState(true);
  const breadCrumbsArray = breadCrumbsArrayStore(
    (state: { breadCrumbsArray: any }) => state.breadCrumbsArray
  );
  const openDrawer = menuStore(
    (state: { openDrawer: any }) => state.openDrawer
  );
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

      <main className="h-screen w-[calc(100%_-_260px)] flex-1 overflow-hidden bg-base" style={{
        paddingTop: `${NAV_HEIGHT}px`,
      }}>
        <div className="relative flex h-full flex-1 flex-col p-2">
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
        </div>
      </main>
    </Box>
  );
}

export default MainLayout;
