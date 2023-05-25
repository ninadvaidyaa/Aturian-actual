import { z } from "zod";

export const statusSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  seq: z.number(),
  color: z.string(),
});

export type Status = z.infer<typeof statusSchema>;

export const flagSchema = z.object({
  id: z.number(),
  name: z.string(),
  seq: z.number(),
  color: z.string(),
  statuses: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      tooltip: z.string(),
      color: z.string(),
      icon: z.string(),
    })
  ),
});

export const flagDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  seq: z.number(),
  status: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type Flag = z.infer<typeof flagSchema>;
export type FlagData = z.infer<typeof flagDataSchema>;
