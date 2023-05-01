
import { ButtonBase } from '@mui/material';
import { type SxProps } from '@mui/system';

import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => (
  <ButtonBase disableRipple sx={sx}>
    {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
  </ButtonBase>
);

export default LogoSection;
