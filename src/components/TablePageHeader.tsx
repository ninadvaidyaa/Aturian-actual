import { useState } from "react";

import SettingOutlined from "@ant-design/icons/SettingOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

import { useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";

import { PopupTransition } from "components/@extended/Transitions";
import MainCard from "components/MainCard";
import IconButton from "components/@extended/IconButton";
import { type Table } from "@tanstack/react-table";
import ScrollX from "./ScrollX";

const Search = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    spacing={1}
    alignItems="center"
  >
    <IconButton
      edge="end"
      aria-label="comments"
      color="secondary"
    >
      <LockOutlined />
    </IconButton>
    <TextField size="small" />
  </Stack>
);
interface TablePageHeaderProps<M> {
  table: Table<M>;
}

const TablePageHeader = <TData,>({ table }: TablePageHeaderProps<TData>) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <MainCard
        elevation={0}
        sx={{
          height: 1,
          "& .MuiCardContent-root": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
          backgroundColor: "inherit",
          border: "none",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
        >
          <Box>
            <Typography
              variant="subtitle1"
              fontSize={theme.spacing(2)}
            >
              Order List
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={2}
            alignContent="center"
          >
            <Search />
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
            >
              Add New Order
            </Button>
            <IconButton
              edge="end"
              aria-label="comments"
              color="secondary"
              onClick={handleMenuClick}
            >
              <SettingOutlined style={{ fontSize: "1.15rem" }} />
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
              <MenuItem onClick={handleShow}>Show/Hide Column</MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </MainCard>

      {/* edit customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleShow}
        open={show}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        <ScrollX>
          <DialogTitle>Show/Hide Column</DialogTitle>
          <Divider />
          <Box>
            <List>
              {table.getAllLeafColumns().map((column) => (
                <ListItem key={column.id}>
                  {column.columnDef.enableHiding === false ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={column.getIsVisible()}
                          color="secondary"
                        />
                      }
                      label={column.columnDef.header?.toString()}
                    />
                  ) : (
                    // <label>
                    //   <input
                    //     {...{
                    //       type: "checkbox",
                    //       checked: column.getIsVisible(),
                    //       onChange: column.getToggleVisibilityHandler(),
                    //     }}
                    //   />
                    //   {column.id}
                    // </label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          color="primary"
                        />
                      }
                      label={column.columnDef.header?.toString()}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </ScrollX>
      </Dialog>
    </>
  );
};

export default TablePageHeader;
