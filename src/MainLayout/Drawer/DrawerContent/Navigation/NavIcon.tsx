import {
  MdOutlineInventory2,
  MdOutlineListAlt,
  MdOutlinePerson,
  MdOutlineShoppingCart,
  MdOutlineDescription,
  MdViewModule,

} from "react-icons/md";

const NavIcon = (iconName: any) => {
  switch (iconName) {
    case "orderIcon":
      return <MdOutlineInventory2 className="h-5 w-5 rounded-sm" />;
    case "customerIcon":
      return <MdOutlinePerson className="h-5 w-5 rounded-sm" />;
    case "supplierIcon":
      return <MdOutlineListAlt className="h-5 w-5 rounded-sm" />;
    case "inventoryIcon":
      return <MdViewModule className="h-5 w-5 rounded-sm" />;
    case "proposalIcon":
      return <MdOutlineShoppingCart className="h-5 w-5 rounded-sm" />;
    case "a/pIcon":
      return <MdOutlineDescription className="h-5 w-5 rounded-sm" />;
    default:
      return <h1>No project match</h1>;
  }
};

export default NavIcon;
