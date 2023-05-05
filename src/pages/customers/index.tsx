import { lazy, useMemo } from "react";

import Loadable from "components/Loadable";
import { fetchAllCustomers } from "api/customer.api";
import { defaultColumns, views } from "./columnDefinition";
import { useColumnFilters, usePagination, useSorting } from "hooks/useTable";
import Loader from "components/Loader";

const ReactTable = Loadable(
  lazy(async () => await import("components/lib/ReactTable/ReactTable"))
);
const CustomerPage = () => {
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

        if (values !== "") {
          const filterKey = column.id.split("-");
          if (filterKey.length > 1) {
            filterParams =
              filterParams + filterParams !== ""
                ? `&filters[${filterKey[0]}][${filterKey[1]}]=${values}`
                : `&filters[${filterKey[0]}][${filterKey[1]}]=${values}`;
          } else {
            filterParams =
              filterParams + filterParams !== ""
                ? `filters[${column.id}]=${values}`
                : `filters[${column.id}]=${values}`;
          }
        }
      }
    });
    params = sortParam;
    params = params !== "" ? params + filterParams : filterParams;
    if (params[params.length - 1] === "&") {
      params = params.slice(0, -1);
    }
    if (params[0] === "&") {
      params = params.slice(1, params.length);
    }
    return params;
  }, [pagination?.pageIndex, pagination?.pageSize, columnFilters, sorting]);
  const { data, isFetching } = useQuery({
    queryKey: [
      "customers",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams,
    ],
    queryFn: async () =>
      await fetchAllCustomers(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams
      ),
    keepPreviousData: true,
  });

  return (
    <>
      {isFetching && <Loader />}
      <ReactTable
        title="Customer"
        size="medium"
        data={data?.data ?? []}
        totalRows={data?.total ?? 0}
        defaultColumns={defaultColumns}
        views={views}
      />
    </>
  );
};

export default CustomerPage;
