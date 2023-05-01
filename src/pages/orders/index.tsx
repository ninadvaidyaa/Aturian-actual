import { defaultColumns } from "./columnDefinition";
import { TableProvider } from "contexts/TableContext";
import OrderPageComponent from "./OrderPage";

const OrderPage = () => (
  <TableProvider columns={defaultColumns}>
    <OrderPageComponent />
  </TableProvider>
);
export default OrderPage;
