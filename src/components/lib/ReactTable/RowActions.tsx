import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "components/@extended/IconButton";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import NoteAddOutlined from "@mui/icons-material/NoteAddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StickyNoteOutlined from "@mui/icons-material/StickyNote2Outlined";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import FileCopyOutlined from "@mui/icons-material/FileCopyOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import type { CellContext } from "@tanstack/react-table";
import { PopupTransition } from "components/@extended/Transitions";
import { DRAWER_WIDTH } from "config";

const genericMemo: <T>(component: T) => T = React.memo;
interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const RowActionComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>
      <Stack
        direction="row"
        gap={theme.spacing(2.5)}
      >
        <Box>
          <IconButton
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <RemoveRedEyeOutlinedIcon style={{ fontSize: "1.15rem" }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <AvTimerIcon style={{ fontSize: "1.15rem", color: "#1890FF" }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
          >
            <DeleteOutlineIcon
              style={{ fontSize: "1.15rem", color: "#BB0505" }}
            />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            shape="rounded"
            edge="end"
            aria-label="comments"
            color="secondary"
            onClick={handleMenuClick}
          >
            <MoreVertOutlinedIcon style={{ fontSize: "1.15rem" }} />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <NoteAddOutlined fontSize="small" />
              </ListItemIcon>
              Order Notes
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <StickyNoteOutlined fontSize="small" />
              </ListItemIcon>
              Data Entry
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <NotificationsNone fontSize="small" />
              </ListItemIcon>
              Order Notification
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CameraAltOutlined fontSize="small" />
              </ListItemIcon>
              Order Proof
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FactCheckOutlined fontSize="small" />
              </ListItemIcon>
              Preview
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FileCopyOutlined fontSize="small" />
              </ListItemIcon>
              Duplicate Order
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <TextSnippetIcon fontSize="small" />
              </ListItemIcon>
              Add Pink Slip
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AssignmentTurnedInOutlined fontSize="small" />
              </ListItemIcon>
              Assign
            </MenuItem>
            <MenuItem onClick={handleAdd}>
              <ListItemIcon>
                <BorderColorOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <Paper
          sx={{
            boxShadow: theme.customShadows.z1,
            minWidth: 750,
            width: {
              md: `calc(100vw - 100px)`,
              lg: `calc(100vw - ${DRAWER_WIDTH + 100}px)`,
              xl: `calc(100vw - ${DRAWER_WIDTH + 140}px)`,
            },
            maxWidth: 1024,
          }}
        ></Paper>
      </Dialog>
    </>
  );
};

const RowActions = genericMemo(RowActionComponent);
export default RowActions;
