import { z } from "zod";

export const ordersListSchema = z.object({
  id: z.number(),
  number: z.string(),
  jobId: z.string(),
  uuid: z.string(),
  customerPO: z.boolean().nullable(),
  date: z.string(),
  estimatedShipDate: z.string(),
  customer: z.object({
    id: z.number(),
    number: z.string(),
    name: z.string(),
  }),
  salesperson: z.object({
    id: z.number(),
    name: z.string(),
  }),
  csr: z.object({
    name: z.string(),
  }),
  ops: z.object({
    status: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),
  accounting: z.object({
    status: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),
  source: z.string(),
  createdBy: z.string(),
  shipDate: z.string(),
  cost: z.number(),
  total: z.number(),
});


export const ordersPOSchema = z.object({
  orderId: z.string(),
  orderNumber: z.string(),
  jobId: z.string(),
  supplierPONum: z.string(),
  customerPO: z.boolean().nullable(),
  custName: z.string(),
  custId: z.number(),
  followupDate: z.string(),
  orderStatus: z.string(),
  inHandDate: z.string(),
  shipDate: z.string(),
  dol: z.number(),
  PoStatus: z.string(),
});

export type OrdersList = z.infer<typeof ordersListSchema>;
export type OrderPO = z.infer<typeof ordersPOSchema>;