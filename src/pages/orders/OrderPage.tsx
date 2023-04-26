import { lazy, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTableContext } from "contexts/TableContext";
import Loadable from "components/Loadable";
import { fetchAllOrders } from "api/order.api";
import { defaultColumns } from "./columnDefinition";

const ReactTable = Loadable(
  lazy(async () => await import("components/lib/ReactTable/ReactTable"))
);
const OrderPageComponent = () => {
  const pagination = useTableContext((s) => s.pagination);
  const columnFilters = useTableContext((s) => s.columnFilters);
  const columnOrder = useTableContext((s) => s.columnOrder);
  const sorting = useTableContext((s) => s.sorting);
  const queryParams = useMemo(() => {
    let params = "";
    let sortParam = "";
    if (sorting && sorting?.length > 0) {
      // id, desc
      sorting?.forEach((s) => {
        if (s.desc) {
          sortParam += `sort[by]=${s.id}&sort[direction]=desc`;
        } else {
          sortParam += `sort[by]=${s.id}&sort[direction]=asc`;
        }
      });
    }
    let filterParams = "";
    columnFilters?.forEach((column) => {
      if (column.value && typeof column.value === "string") {
        const values = column.value
          .split("|")
          .filter((v) => v !== "")
          .join(",");

        if (values !== "") filterParams += `filters[${column.id}]=${values}`;
      }
    });
    params = sortParam + "&" + filterParams;
    if (params[params.length - 1] === "&") {
      params = params.slice(0, -1);
    }
    if (params[0] === "&") {
      params = params.slice(1, params.length);
    }
    return params;
  }, [
    pagination?.pageIndex,
    pagination?.pageSize,
    columnFilters,
    columnOrder,
    sorting,
  ]);
  const { data } = useQuery({
    queryKey: [
      "ordersList",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams,
    ],
    queryFn: async () =>
      await fetchAllOrders(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams
      ),
    keepPreviousData: true,
  });

  return (
    <ReactTable
      size="medium"
      data={data?.data ?? []}
      totalRows={data?.results ?? 0}
      defaultColumns={defaultColumns}
    />
  );
};

export default OrderPageComponent;
