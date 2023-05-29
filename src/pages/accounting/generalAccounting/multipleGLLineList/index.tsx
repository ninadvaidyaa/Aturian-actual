import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {  fetchMultiGLLines} from "api/accounting.api";
import Loader from "components/Loader";

import { defaultColumns } from "./columnDefinition";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
  useTableActions,
} from "hooks/useTable";
import { useSetRowSelection } from "hooks/useSelectRow";

import {
  TablePagination,
  Table,
} from "components/lib/ReactTable";
import { fetchAllFlags, fetchAllStatus } from "api/settings.api";


// import CheckBox from "components/CheckBox";
import SearchComboBox from "components/SearchComboBox";
import { Grid } from "@mui/material";

const MultiGLLinePage = () => {
  const pagination = usePagination();
  const tableActions = useTableActions();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
  const setRowSelection = useSetRowSelection();

  const defaultData = useMemo(() => [], []);

  useEffect(
    () => () => {
      tableActions.reset();
    },
    []
  );

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
  const { data:statusData, } = useQuery(["status"], fetchAllStatus);
  const { data:flagData } = useQuery(["flags"], fetchAllFlags);
  
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      "multiGLLine",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchMultiGLLines (
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams()
      ),
    keepPreviousData: true,
    enabled: (!!statusData?.results && !!flagData?.results) ?? false ,
  });

  // instantiate the table
  const table = useTable({
    data: data?.data ?? defaultData,
    defaultColumns,
    totalRows: data?.results ?? 0,
  });
  const glAccounts = [
    { label: '10100 Inventory Customer-10100' },
    { label: '10200 Inventory Customer-10200' },
    { label: '10300 Inventory Customer-10300' },
    { label: '10400 Inventory Customer-10400' },
  ];

  const period = [
    { label: '2203' },
    { label: '2204' },
    { label: '2205' },
    { label: '2206' },
  ];
  return (
    <>
      {isFetching && <Loader />}
      
        
        <div className="flex flex-row gap-2 mt-2.5 p-5 bg-white	">
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <SearchComboBox options={glAccounts} placeholder="Search G/L Account" />
            </Grid>
            <Grid item xs={6}>
            {/* <SearchComboBox options={top100Films} placeholder="Search Item Name/Comments" /> */}
            </Grid>
            <Grid item xs={6}>
            <SearchComboBox options={period} placeholder="Begin Book Period" />
            </Grid>
            <Grid item xs={6}>
            <SearchComboBox options={period} placeholder="End Book Period" />
            </Grid>
           
            
          </Grid>
        
        </div>
        <div className="flex flex-row gap-2 mt-1.5 p-2.5 w-full bg-white">
        
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
          paddingTop={424}
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
            setRowSelection({});
          }}
          rowCount={data?.results ?? 0}
          onPreviousClick={() => {
            table.previousPage();
            setRowSelection({});
          }}
          onNextClick={() => {
            table.nextPage();
            setRowSelection({});
          }}
          onFirstPageClick={() => {
            table.setPageIndex(0);
            setRowSelection({});
          }}
          onLastPageClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            setRowSelection({});
          }}
        />
      </div>
    </>
  );
};

export default MultiGLLinePage;
