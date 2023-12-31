import { type Column } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import SelectFilter from "./TableFilterDropDown";

type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  columnId: string;
  uniqueValues?: string[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const showCheckedFirst = (data: string[], value: string[]) =>
  data.sort((a, b) => {
    // Display the selected labels first.
    let ai = value.indexOf(a);
    ai = ai === -1 ? value.length + data.indexOf(a) : ai;
    let bi = value.indexOf(b);
    bi = bi === -1 ? value.length + data.indexOf(b) : bi;
    return ai - bi;
  });

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  uniqueValues,
  columnId,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  const sortedData = useMemo(() => {
    if (uniqueValues && uniqueValues.length > 0) {
      return showCheckedFirst(uniqueValues, (value as string).split("|"));
    }
    return [];
  }, [uniqueValues, value]);

  if (uniqueValues && uniqueValues.length > 0) {
    return (
      <SelectFilter
        label={props.placeholder as string}
        data={sortedData}
        setValue={(inp: string[]) => {
          setValue(inp.join("|"));
        }}
        value={(value as string).split("|")}
      />
    );
  }
  return (
    <input
      className="block w-full rounded-md border border-gray-200  bg-white px-1.5 py-1 text-sm text-gray-700 focus:border-slate-300 focus:ring-slate-300"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export interface FilterProps {
  column: Column<any, unknown>;
}

const Filter = ({ column }: FilterProps) => {
  const columnFilterValue = column.getFilterValue();
  const {
    columnDef: { meta },
  } = column;
  const sortedUniqueValues = useMemo(
    () =>
      meta?.isSelectable
        ? // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
          Array.from(column.getFacetedUniqueValues().keys()).sort()
        : [],
    [column?.getFacetedUniqueValues()]
  );
  if (column.columnDef.meta?.dataType === "number") {
    return (
      <DebouncedInput
        type="number"
        columnId={column.id}
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) => {
          column.setFilterValue((old: [number, number]) => [value, old?.[1]]);
        }}
        placeholder={column.columnDef?.header?.toString()}
      />
    );
  }
  if (column.columnDef.meta?.dataType === "date") {
    return (
      <DebouncedInput
        type="date"
        columnId={column.id}
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => {
          column.setFilterValue(value);
        }}
        placeholder={column.columnDef?.header?.toString()}
        uniqueValues={sortedUniqueValues}
      />
    );
  }
  return (
    <DebouncedInput
      type="text"
      columnId={column.id}
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => {
        column.setFilterValue(value);
      }}
      placeholder={column.columnDef?.header?.toString()}
      uniqueValues={sortedUniqueValues}
    />
  );
};

export default Filter;
