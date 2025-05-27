import { z } from "zod";

export const MovimientoSchema = z
  .object({
    type: z.enum(["ENTRY", "EXIT", "SALE"]),
    inventoryItem: z.string().min(1, "Producto requerido"),
    quantity: z.number().min(1, "Cantidad debe ser mayor a 0"),
    unitCost: z.number().optional(),
    timeSpan: z.number().optional(),
    timeUnit: z.enum(["days", "weeks", "months", "years"]).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "ENTRY") {
        return typeof data.unitCost === "number" && data.unitCost > 0;
      }
      return true;
    },
    {
      message: "Costo unitario requerido para tipo ENTRY",
      path: ["unitCost"],
    }
  );


export type MovimientoFormValues = z.infer<typeof MovimientoSchema>