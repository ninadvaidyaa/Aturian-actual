import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "components/logo";
import useConfig from "hooks/useConfig";

import { LAYOUT_CONST } from "types/config";

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuOrientation } = useConfig();
  const isHorizontal =
    menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? "unset" : "60px",
        width: isHorizontal ? { xs: "100%", lg: "424px" } : "inherit",
        paddingBottom: isHorizontal ? { xs: "18px", lg: "0" } : "8px",
        paddingLeft: isHorizontal ? { xs: "0", lg: "0" } : open ? "0" : 0,
      }}
    >
      <Logo
        isIcon={!open}
        sx={{ width: open ? "auto" : 35, height: 35 }}
      />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
