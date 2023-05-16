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
export type OrdersList = z.infer<typeof ordersListSchema>;