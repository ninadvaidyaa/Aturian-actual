import "@tanstack/react-table";
import { type columnDataType } from "constants/column.dataTypes";

declare module "@tanstack/react-table" {
  // @ts-expect-error Oder definitions are not required
  interface ColumnMeta {
    dataType: columnDataType;
    isStatus?: boolean ; // to customize status  
    isSelectable?: boolean; // Is it a status column, Helps in getting unique value. Default false
    isCurrency?: boolean; // default false
    isDate?: boolean; // default false
    dateFormate?: string; // date formate from api
  }
}
