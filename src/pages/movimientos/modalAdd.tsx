import { useInventarios } from "@/api/inventario";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alerts } from "@/shared/components/alert/alerts";
import {
  MovimientoSchema,
  type MovimientoFormValues,
} from "@/shared/schemas/movimientos.schema";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { queryClient } from "@/shared/utils/queryCliente";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { useCreateMovimiento } from "@/api/movimientos";
import type { Inventory } from "@/shared/types/Inventory";

export const ModalAdd = ({ id }: { id: string }) => {
  const tipos = ["ENTRY", "EXIT", "SALE"];
  const [isOpen, setIsOpen] = useState(false);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const { mutate: createMovimiento, isPending } = useCreateMovimiento();
  const { data: inventarios = [] } = useInventarios(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<MovimientoFormValues>({
    resolver: zodResolver(MovimientoSchema),
    defaultValues: {
      type: "ENTRY",
      inventoryItem: id,
      quantity: 0,
      unitCost: 0,
      timeSpan: 0,
      timeUnit: "days", 
    },
  });

  const tipoSeleccionado = watch("type");

  const onSubmit = (values: MovimientoFormValues) => {

    if (tipoSeleccionado != "ENTRY") {
      values.unitCost = 1;
      values.timeSpan = 1;
      values.timeUnit = "days";
    }


    createMovimiento(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`movimientos_${tipoSeleccionado}`, id],
        });
        setIsOpen(false);
        reset();
      },
      onError: () => {
        setAlertMsg("ERROR AL CREAR EL MOVIMIENTO");
        setAlertOpen(true)
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar Movimiento</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log(err);
          })}
          className="space-y-5"
        >
          {/* Tipo de Movimiento */}
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Producto */}
          <div>
            <label className="text-sm font-medium">Producto</label>
            <Controller
              control={control}
              name="inventoryItem"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventarios.map((item: Inventory) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} {item.sku}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.inventoryItem && (
              <p className="text-sm text-red-500">
                {errors.inventoryItem.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="text-sm font-medium">
              Cantidad
            </label>
            <Input
              id="quantity"
              placeholder="Ej. 2"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {tipoSeleccionado === "ENTRY" && (
            <>
              <div>
                <label htmlFor="unitCost" className="text-sm font-medium">
                  Costo Unitario
                </label>
                <Input
                  id="unitCost"
                  placeholder="Ej. 12.50"
                  type="number"
                  {...register("unitCost", { valueAsNumber: true })}
                />
                {errors.unitCost && (
                  <p className="text-sm text-red-500">
                    {errors.unitCost.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <div>
                  <label
                    htmlFor="timeSpan"
                    className="text-sm font-medium"
                  >
                    Vida útil
                  </label>
                  <Input
                    id="tiempo"
                    type="number"
                    placeholder="Ej. 2"
                    {...register("timeSpan", { valueAsNumber: true })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="timeUnit"
                    className="text-sm font-medium"
                  >
                    Unidad
                  </label>
                  <Controller
                    control={control}
                    name="timeUnit"
                    defaultValue="days"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Días</SelectItem>
                          <SelectItem value="weeks">Semanas</SelectItem>
                          <SelectItem value="months">Meses</SelectItem>
                          <SelectItem value="years">Años</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creando..." : "Crear"}
          </Button>
        </form>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <Alerts contenido={alertMsg} open={alertOpen} onOpenChange={setAlertOpen} />
    </Dialog>
  );
};
