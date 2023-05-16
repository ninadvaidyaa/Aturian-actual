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
