import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
interface IProps extends SvgIconProps {
  iconColor?: string;
}
const MultiOrder = ({ iconColor = "#808000", ...props }: IProps) => (
  <SvgIcon
    {...props}
    style={{ color: iconColor ?? "" }}
  >
    <path d="M17.6167 4.85833L16.4583 3.45833C16.2333 3.175 15.8917 3 15.5 3H5.5C5.10833 3 4.76667 3.175 4.53333 3.45833L3.38333 4.85833C3.14167 5.14167 3 5.51667 3 5.91667V16.3333C3 17.25 3.75 18 4.66667 18H16.3333C17.25 18 18 17.25 18 16.3333V5.91667C18 5.51667 17.8583 5.14167 17.6167 4.85833ZM5.7 4.66667H15.3L15.975 5.475H5.03333L5.7 4.66667ZM4.66667 16.3333V7.16667H16.3333V16.3333H4.66667Z" />
  </SvgIcon>
);

export default MultiOrder;
