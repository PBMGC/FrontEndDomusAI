import { z } from "zod";

export const InventorySchema = z.object({
    name:z.string(),
    sku:z.string()
})

export type InventoryFormValues = z.infer<typeof InventorySchema>

export const InventoryUpdateSchema = z.object({
    id:z.string(),
    qty: z.number().min(1)
})

export type InventoryUpdateValues = z.infer<typeof InventoryUpdateSchema>
