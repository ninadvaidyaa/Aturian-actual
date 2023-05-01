import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, useMediaQuery } from "@mui/material";
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import useConfig from "hooks/useConfig";
import { HORIZONTAL_MAX_ITEM } from "config";
import { type NavItemType } from "types/menu";
import { LAYOUT_CONST } from "types/config";
import { menuStore } from "hooks/useNavBar";
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuOrientation } = useConfig();
  const drawerOpen = menuStore(
    (state: { drawerOpen: any }) => state.drawerOpen
  );
  const [selectedItems, setSelectedItems] = useState<string | undefined>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const isHorizontal =
    menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;
  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItem.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItem.items.length) {
    lastItemId = menuItem.items[lastItem - 1]?.id as string;
    lastItemIndex = lastItem - 1;
    remItems = menuItem.items
      .slice(lastItem - 1, menuItem.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
      }));
  }

  const navGroups = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case "group":
        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem as number}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography
            key={item.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        "& > ul:first-of-type": { mt: 0 },
        display: isHorizontal ? { xs: "block", lg: "flex" } : "block",
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
