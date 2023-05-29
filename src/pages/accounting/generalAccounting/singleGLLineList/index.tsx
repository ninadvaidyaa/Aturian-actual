import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchSingleGLLines } from "api/accounting.api";
import Loader from "components/Loader";

import { useDefaultColumns } from "./columnDefinition";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
  useTableActions,
} from "./useTable";

import { TablePagination, Table } from "components/lib/ReactTable";
import { fetchAllFlags, fetchAllStatus } from "api/settings.api";

// import CheckBox from "components/CheckBox";
import SearchComboBox from "components/SearchComboBox";
import { Grid } from "@mui/material";

const SingleGLLinePage = () => {
  const pagination = usePagination();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
  const defaultData = useMemo(() => [], []);
  const defaultColumns = useDefaultColumns();
  const { setColumnOrder } = useTableActions();

  useEffect(() => {
    setColumnOrder(defaultColumns.map((c) => c.id as string));
  }, []);
  const queryParams = () => {
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
  };
  const { data: statusData } = useQuery(["status"], fetchAllStatus);
  const { data: flagData } = useQuery(["flags"], fetchAllFlags);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      "singleGLLine",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchSingleGLLines(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams()
      ),
    keepPreviousData: true,
    enabled: (!!statusData?.results && !!flagData?.results) ?? false,
  });

  // instantiate the table
  const table = useTable({
    data: data?.data ?? defaultData,
    defaultColumns,
    totalRows: data?.results ?? 0,
  });
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  return (
    <>
      {isFetching && <Loader />}

      <div className="mt-2.5 flex flex-row gap-2 bg-white p-5	">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            <SearchComboBox
              options={top100Films}
              placeholder="Search G/L Account"
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <SearchComboBox
              options={top100Films}
              placeholder="Begin Book Period"
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <SearchComboBox
              options={top100Films}
              placeholder="End Book Period"
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <SearchComboBox
              options={top100Films}
              placeholder="Search Item Name/Comments"
            />
          </Grid>
        </Grid>
      </div>
      <div className="mt-1.5 flex w-full flex-row gap-2 bg-white p-2.5">
        <button
          type="button"
          className="mr-2 inline-flex items-center justify-center rounded-lg bg-skin-fill px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-slate-50 hover:bg-skin-fill"
        >
          <i className="fal -ml-1 mr-2 "></i>
          Submit
        </button>
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-lg bg-skin-fill px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-slate-50 hover:bg-skin-fill"
        >
          <i className="fal -ml-1 mr-2 "></i>
          Excel
        </button>
      </div>

      <div className="">
        <Table
          table={table}
          isError={isError}
          error={error}
        />
        <TablePagination
          pageSize={table.getState().pagination.pageSize}
          pageIndex={table.getState().pagination.pageIndex}
          hasNextPage={table.getCanNextPage()}
          hasPrevPage={table.getCanPreviousPage()}
          setPageSize={(newSize: number) => {
            table.setPageSize(newSize);
          }}
          gotoPage={(n: number) => {
            table.setPageIndex(n);
          }}
          rowCount={data?.results ?? 0}
          onPreviousClick={() => {
            table.previousPage();
          }}
          onNextClick={() => {
            table.nextPage();
          }}
          onFirstPageClick={() => {
            table.setPageIndex(0);
          }}
          onLastPageClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
        />
      </div>
    </>
  );
};

export default SingleGLLinePage;
