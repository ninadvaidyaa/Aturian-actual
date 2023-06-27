import { z } from "zod";

export interface PickListInventory {
  orderNote: boolean;
  pickPackStatus: string;
  packingSlip: string;
  isShippingLabelExists: boolean;
  isOrderExistInBothList: number;
  orderNumber: string;
  custName: string;
  orderDate: string;
  inHandDate: string;
  dayOnList: number;
  noOfItems: number;
}
export interface InventoryItemsList {
  itemNumber: number;
  externalItemNumber: number;
  alias1: string;
  typeItemDesc: string;
  supplierItemNumber: string;

  primaryDesc: string;
  categoryDesc: number;
  itemStatus: string;

  custNumber: number;
  custName: string;
}

export interface PickPackOthersList {
  orderNumber: number;
  custName: string;
  orderDate: string;
  inHandDate: string;
  daysOnList: number;
  noOfItems: number;
  pickPackStatus: string;
}


export const receivedOrderSchema = z.object({

  number : z.string(),
  jobID : z.string(),
  customer : z.object({
    number: z.number(),
    name : z.string()
  }),
  salesman: z.object({
    number: z.number(),
    name : z.string()
  }),
  CSR :  z.object({
    number: z.number(),
    name : z.string()
  }),

  orderDate : z.string(),
  status : z.string(),


});

export type ReceivedOrder = z.infer<typeof receivedOrderSchema>;