import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase, ClickAwayListener,  Paper, Popper, Stack, Typography } from '@mui/material';

import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import avatar1 from 'assets/images/users/avatar-1.png';
import useLogOut from 'hooks/useLogOut';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';



// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const {onLogout} = useLogOut();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };



  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "secondary.light"
                : "secondary.lighter",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ p: 0.5 }}
        >
          <Avatar
            alt="profile user"
            src={avatar1}
            size="xs"
          />
          <Typography variant="subtitle1">Johns Ben</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position="top-right"
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: theme.spacing(18.5),
                minWidth: theme.spacing(18.5),
                maxWidth: theme.spacing(20),
                [theme.breakpoints.down("md")]: {
                  maxWidth: theme.spacing(31),
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  elevation={0}
                  border={false}
                  content={false}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton   onClick={onLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                 
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
