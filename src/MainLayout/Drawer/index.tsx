import { useMemo } from "react";

import { Box } from "@mui/material";

import DrawerHeader from "./DrawerHeader";
import MiniDrawerStyled from "./MiniDrawerStyled";
import Navigation from "./DrawerContent/Navigation";

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  open: boolean;
  window?: () => Window;
  handleDrawerToggle?: () => void;
}

const MainDrawer = ({ open, handleDrawerToggle, window }: Props) => {
  const drawerContent = useMemo(() => <Navigation />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="mailbox folders"
    >
      <MiniDrawerStyled
        variant="permanent"
        open={open}
      >
        {drawerHeader}
        {drawerContent}
      </MiniDrawerStyled>
    </Box>
  );
};

export default MainDrawer;
