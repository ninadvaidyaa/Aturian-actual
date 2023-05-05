import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import NavItem from "./NavItem";

import Transitions from "components/@extended/Transitions";

import useConfig from "hooks/useConfig";

import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { type NavItemType } from "types/menu";
import { LAYOUT_CONST } from "types/config";

import { menuStore } from "hooks/useNavBar";
import NavIcon from "./NavIcon";

interface VirtualElement {
  getBoundingClientRect: () => ClientRect | DOMRect;
  contextElement?: Element;
}

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: "visible",
  zIndex: 1202,
  minWidth: 180,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.grey.A800}`,
    borderBottom: `1px solid ${theme.palette.grey.A800}`,
  },
}));

// ==============================|| NAVIGATION - LIST COLLAPSE ||============================== //

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

const NavCollapse = ({
  menu,
  level,
  parentId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
}: Props) => {
  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const drawerOpen = menuStore(
    (state: { drawerOpen: any }) => state.drawerOpen
  );
  const { menuOrientation } = useConfig();
  const Navigation = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<
    VirtualElement | (() => VirtualElement) | null | undefined
  >(null);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | undefined
  ) => {
    // console.log(menu)
    setAnchorEl(null);
    setSelectedLevel(level);

    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu.id : "");
      if (menu.url) Navigation(`${menu.url}`);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) Navigation(`${menu.url}`);
    }
  };

  const handleHover = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | undefined
  ) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setAnchorEl(null);
  };
  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (drawerOpen && level === selectedLevel) {
        setOpen(false);
        setSelected(null);
      }
    }
  }, [selectedItems, level, selected, selectedLevel]);

  const { pathname } = useLocation();
  const openMini = Boolean(anchorEl);

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((item: NavItemType) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setSelected(null);
    if (openMini) setAnchorEl(null);
    if (menu.children) {
      menu.children.forEach((item: NavItemType) => {
        if (item.children?.length && menu.id) {
          checkOpenForParent(item.children, menu.id);
        }
        if (pathname?.includes("product-details")) {
          if (item.url?.includes("product-details")) {
            setSelected(menu.id);
            setOpen(true);
          }
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);

  const setActiveItem = menuStore(
    (state: { setActiveItem: any }) => state.setActiveItem
  );

  useEffect(() => {
    if (menu.url === pathname) {
      setActiveItem(menu.id);
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  const handelItemClick = (event: any) => {
    setSelected(menu.id);
    setOpen(true);
    setSelectedItems(menu.id);
  };
  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case "item":
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
            handleChange={handelItemClick}
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
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;
  const borderIcon =
    level === 1 ? (
      <CheckBoxOutlineBlankSharpIcon style={{ fontSize: "1rem" }} />
    ) : (
      false
    );
  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
  ) : (
    borderIcon
  );
  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";
  const iconSelectedColor =
    theme.palette.mode === "dark" && drawerOpen
      ? theme.palette.text.primary
      : theme.palette.primary.main;
  const popperId = openMini ? `collapse-pop-${menu.id}` : undefined;
  const FlexBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };
  return (
    <>
      {menuOrientation === LAYOUT_CONST.VERTICAL_LAYOUT || downLG ? (
        <>
          <ListItemButton
            disableRipple
            selected={selected === menu.id}
            {...(!drawerOpen && {
              onMouseEnter: handleClick,
              onMouseLeave: handleClosePopup,
            })}
            onClick={handleClick}
            sx={{
              pl: drawerOpen ? `${level * 28}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "divider"
                      : "primary.lighter",
                },
                "&.Mui-selected": {
                  bgcolor: "transparent",
                  color: iconSelectedColor,
                  "&:hover": {
                    color: iconSelectedColor,
                    bgcolor:
                      theme.palette.mode === "dark" ? "divider" : "transparent",
                  },
                },
              }),
              ...(!drawerOpen && {
                "&:hover": {
                  bgcolor: "transparent",
                },
                "&.Mui-selected": {
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  bgcolor: "transparent",
                },
              }),
            }}
          >
            {menuIcon && (
              <ListItemIcon
                onClick={handlerIconLink}
                sx={{
                  minWidth: 28,
                  color: selected === menu.id ? "primary.main" : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 15,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "secondary.light"
                          : "secondary.lighter",
                    },
                  }),
                  ...(!drawerOpen &&
                    selected === menu.id && {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "primary.900"
                          : "primary.lighter",
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "primary.darker"
                            : "primary.lighter",
                      },
                    }),
                }}
              >
                {NavIcon(menu.icon)}
              </ListItemIcon>
            )}

            {drawerOpen && (
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    color={selected === menu.id ? "primary" : textColor}
                  >
                    {menu.title}
                  </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography
                      variant="caption"
                      color="secondary"
                    >
                      {menu.caption}
                    </Typography>
                  )
                }
              />
            )}

            {(drawerOpen || (!drawerOpen && level !== 1)) &&
              (openMini || open ? (
                <KeyboardArrowUpIcon
                  style={{
                    fontSize: theme.spacing(2),
                    marginLeft: 1,
                    color: theme.palette.primary.main,
                  }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ fontSize: theme.spacing(2), marginLeft: 1 }}
                />
              ))}

            {!drawerOpen && (
              <PopperStyled
                open={openMini}
                anchorEl={anchorEl}
                placement="right-start"
                style={{
                  zIndex: 2001,
                }}
                popperOptions={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [-12, 1],
                      },
                    },
                  ],
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions
                    in={openMini}
                    {...TransitionProps}
                  >
                    <Paper
                      sx={{
                        overflow: "hidden",
                        mt: 1.5,

                        backgroundImage: "none",
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box>{navCollapse}</Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
          {drawerOpen && (
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <List sx={{ p: 0 }}>{navCollapse}</List>
            </Collapse>
          )}
        </>
      ) : (
        <>
          <ListItemButton
            id={`boundary-${popperId}`}
            disableRipple
            selected={isSelected}
            onMouseEnter={handleHover}
            onMouseLeave={handleClose}
            onClick={handleHover}
            aria-describedby={popperId}
            sx={{
              "&.Mui-selected": {
                bgcolor: "transparent",
              },
            }}
          >
            <Box
              onClick={handlerIconLink}
              sx={FlexBox}
            >
              {!menuIcon && level !== 1 && (
                <ListItemIcon
                  sx={{
                    my: "auto",
                    minWidth: !menu.icon ? 18 : 36,
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "transparent" },
                  }}
                ></ListItemIcon>
              )}
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ my: "auto" }}
                  >
                    {menu.title}
                  </Typography>
                }
              />
              {openMini ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Box>

            {anchorEl && (
              <PopperStyled
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="right-start"
                style={{
                  zIndex: 2001,
                }}
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [-10, 0],
                    },
                  },
                ]}
              >
                {({ TransitionProps }) => (
                  <Transitions
                    in={openMini}
                    {...TransitionProps}
                  >
                    <Paper
                      sx={{
                        overflow: "hidden",
                        mt: 1.5,
                        py: 0.5,
                        boxShadow: theme.shadows[8],
                        backgroundImage: "none",
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box>{navCollapse}</Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </>
      )}
    </>
  );
};

export default NavCollapse;
