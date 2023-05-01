import { type ReactNode, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, type AppBarProps } from '@mui/material';
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import useConfig from 'hooks/useConfig';
import IconButton from 'components/@extended/IconButton';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { LAYOUT_CONST } from 'types/config';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Header = ({ open, handleDrawerToggle }: Props) => {
  const theme = useTheme();
  const downLG = true;
  const { menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;

  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === 'dark' ? 'background.default' : 'grey.100';

  const mainHeader: ReactNode = (
    <Toolbar>
      {!isHorizontal ? (
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          color="secondary"
          variant="light"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml:  -2  }}
        >
          {!open ? <MenuOpenIcon sx={{ transform: 'rotate(180deg)'}} /> : <MenuOpenIcon />}
        </IconButton>
      ) : null}
      {headerContent}
    </Toolbar>
  );

  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: isHorizontal ? '100%' : open ? 'calc(100% - 260px)' :   'calc(100% - 60px)' 
    }
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
