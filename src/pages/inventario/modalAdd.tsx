import { useCreateInventario } from "@/api/inventario";
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
  InventorySchema,
  type InventoryFormValues,
} from "@/shared/schemas/inventory.schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { queryClient } from "@/shared/utils/queryCliente";
import { zodResolver } from "@hookform/resolvers/zod";

export const ModalAdd = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const { mutate: createInventory, isPending } = useCreateInventario();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      name: "",
      sku: ""
    },
  });

  const onSubmit = (values: InventoryFormValues) => {
    createInventory(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventarios", id] });
        setIsOpen(false);
        reset();
      },
      onError: () => {
        setAlertMsg("ERROR AL CREAR EL INVENTARIO");
        setAlertOpen(true)
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar Inventario</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Inventario</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              placeholder="Ej. CAJA DE PAPAS"
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="sku" className="text-sm font-medium">
              SKU
            </label>
            <Input
              id="sku"
              placeholder="Ej. 238324SKJHA"
              type="text"
              {...register("sku")}
            />
            {errors.sku && (
              <p className="text-sm text-red-500">{errors.sku.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
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
