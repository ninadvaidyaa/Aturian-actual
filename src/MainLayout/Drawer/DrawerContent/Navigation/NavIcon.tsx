
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const NavIcon = (iconName: any) => {
    switch(iconName) {

      case "orderIcon":   return <Inventory2OutlinedIcon  sx={{ borderRadius: 1, width: 18, height: 18 }}/>;
      case "customerIcon":   return <PersonOutlineOutlinedIcon sx={{ borderRadius: 1, width: 18, height: 18 }} />;
    
      default:      return <h1>No project match</h1>;
    }
  };


  export default NavIcon;