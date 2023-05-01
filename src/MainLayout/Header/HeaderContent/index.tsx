import { Box } from "@mui/material";
import Search from "./Search";

import Profile from "./Profile";
import Notification from "./Notification";

import useConfig from "hooks/useConfig";

import { LAYOUT_CONST } from "types/config";
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = false;

  return (
    <>
      {menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG}
      <Search />
      {downLG && <Box sx={{ width: "100%", ml: 1 }} />}
      <Notification />
      <Profile />
    </>
  );
};

export default HeaderContent;
