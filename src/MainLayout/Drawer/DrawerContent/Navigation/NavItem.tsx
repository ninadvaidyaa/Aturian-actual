import {
  forwardRef,
  useEffect,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useConfig from "hooks/useConfig";
import { type LinkTarget, type NavItemType } from "types/menu";
import { LAYOUT_CONST } from "types/config";
import { breadCrumbsArrayStore } from "hooks/useBreadCrumbs";
import { menuStore } from "hooks/useNavBar";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //
interface Props {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const theme = useTheme();

  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const drawerOpen = menuStore(
    (state: { drawerOpen: any }) => state.drawerOpen
  );
  const openItem = menuStore((state: { openItem: any }) => state.openItem);
  const openDrawer = menuStore(
    (state: { openDrawer: any }) => state.openDrawer
  );
  const setActiveItem = menuStore(
    (state: { setActiveItem: any }) => state.setActiveItem
  );
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const setBreadCrumbsArray = breadCrumbsArrayStore(
    (state: { setBreadCrumbsArray: any }) => state.setBreadCrumbsArray
  );
  const { menuOrientation } = useConfig();
  const itemTarget: LinkTarget = "_self";
  let listItemProps: {
    component:
      | ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>>
      | string;
    href?: string;
    target?: LinkTarget;
  } = {
    // eslint-disable-next-line react/display-name
    component: forwardRef((props, _refs) => (
      <Link
        {...props}
        to={item.url ?? "#"}
        target={itemTarget}
      />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
  ) : (
    false
  );

  const isSelected =
    openItem?.findIndex((id: string | undefined) => id === item.id) > -1;

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === item.url) {
      setActiveItem([item.id]);
      setBreadCrumbsArray(item.breadcrumbsArray);
    }
  }, [pathname]);

  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";
  const iconSelectedColor =
    theme.palette.mode === "dark" && drawerOpen
      ? "text.primary"
      : "primary.main";

  return (
    <>
      {menuOrientation === LAYOUT_CONST.VERTICAL_LAYOUT || downLG ? (
        <ListItemButton
          {...listItemProps}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark" ? "divider" : "primary.lighter",
              },
              "&.Mui-selected": {
                bgcolor:
                  theme.palette.mode === "dark" ? "divider" : "primary.lighter",
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "divider"
                      : "primary.lighter",
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
          {...(matchDownLg && {
            onClick: () => {
              openDrawer(false);
            },
          })}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 16,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: theme.spacing(2),
                  height: theme.spacing(2),
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
                  isSelected && {
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
            ></ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{ color: isSelected ? iconSelectedColor : textColor }}
                >
                  {item.title}
                </Typography>
              }
            />
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          {...listItemProps}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            ...(drawerOpen && {
              "&:hover": {
                bgcolor: "transparent",
              },
              "&.Mui-selected": {
                bgcolor: "transparent",
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor: "transparent",
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
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 36,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: theme.spacing(2),
                  height: theme.spacing(2),
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }),
              }}
            ></ListItemIcon>
          )}

          {!itemIcon && (
            <ListItemIcon
              sx={{
                color: isSelected ? "primary.main" : "secondary.main",
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }),
              }}
            ></ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography
                variant="h6"
                color="inherit"
              >
                {item.title}
              </Typography>
            }
          />
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
