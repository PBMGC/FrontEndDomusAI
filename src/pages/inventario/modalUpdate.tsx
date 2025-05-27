import { useUpdateInventario } from "@/api/inventario";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Alerts } from "@/shared/components/alert/alerts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { queryClient } from "@/shared/utils/queryCliente";
import {
  InventoryUpdateSchema,
  type InventoryUpdateValues,
} from "@/shared/schemas/inventory.schema";

export const ModalUpdate = ({
  id,
  qty,
  idProducto,
}: {
  id: string;
  qty: number;
  idProducto: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryUpdateValues>({
    resolver: zodResolver(InventoryUpdateSchema),
    defaultValues: {
      id: idProducto,
      qty,
    },
  });

  const { mutate: updateInventory, isPending } = useUpdateInventario();

  const onSubmit = (values: InventoryUpdateValues) => {
    updateInventory(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventarios", id] });
        setIsOpen(false);
      },
      onError: (error) => {
        setAlertMsg(error.message || "Error al actualizar inventario");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Cantidad</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Actualizar Producto Inventario</DialogTitle>
        </DialogHeader>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Cantidad</label>
            <Input
              type="number"
              min={1}
              {...register("qty", { valueAsNumber: true })}
            />
            {errors.qty && (
              <p className="text-sm text-red-500">{errors.qty.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Actualizando..." : "Actualizar"}
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
