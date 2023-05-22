import React, { type HTMLProps } from "react";

type Props = {
  indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckBox = ({ indeterminate, ...rest }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ref = React.useRef<HTMLInputElement>(null!);
React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className="m-auto flex h-full w-full items-center">
      
        <input
          ref={ref}
          type="checkbox"
          {...rest}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500"
        />
        <label className="m-auto ml-2 text-sm font-medium text-gray-900">{rest.label} </label>
    </div>
  );
};

export default CheckBox;
