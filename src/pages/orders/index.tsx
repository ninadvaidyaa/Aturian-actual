
import { defaultColumns } from "./columnDefinition";
import { TableProvider } from "contexts/TableContext";
import OrderPageComponent from "./OrderPage";

const OrderPage = () => (
  // const queryParams = sorting[0]
  //   ? `sort[by]=${sorting[0].id}&sort[direction]=${
  //       sorting[0].desc ? "desc" : "asc"
  //     }`
  //   : "";

  // const { data } = useAllOrdersQuery(pageIndex, pageSize, queryParams);

  <TableProvider columns={defaultColumns}>
    {/* <ReactTable
        size="medium"
        data={data?.data ?? []}
        defaultColumns={defaultColumns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        totalRows={data?.results ?? 0}
      /> */}
    <OrderPageComponent />
  </TableProvider>
);
export default OrderPage;
