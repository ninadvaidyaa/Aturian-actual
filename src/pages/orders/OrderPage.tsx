import { lazy, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAllOrders } from "api/order.api";
import {
  useColumnFilters,
  usePagination,
  useSorting
} from "hooks/useTable";
import Loader from "components/Loader";
import Loadable from "components/Loadable";

import { defaultColumns, views } from "./columnDefinition";
import ErrorPage from "components/ErrorPage";

const ReactTable = Loadable(
  lazy(async () => await import("components/lib/ReactTable/ReactTable"))
);
const OrderPageComponent = () => {
  const pagination = usePagination();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
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
  }, [pagination?.pageIndex, pagination?.pageSize, columnFilters, sorting]);
  const { data, isFetching, isError } = useQuery({
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
    // useErrorBoundary: true,
    onError: (e) => {
      console.log(e);
    },
  });
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      {isFetching && <Loader />}
      {!isError && (
        <ReactTable
          size="medium"
          title="Order"
          data={data?.data ?? []}
          totalRows={data?.results ?? 0}
          defaultColumns={defaultColumns}
          views={views}
        />
      )}
    </>
  );
};

export default OrderPageComponent;
