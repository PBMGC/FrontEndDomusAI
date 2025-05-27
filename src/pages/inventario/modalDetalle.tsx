import { useInventariosHistorial } from "@/api/inventario";
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
import { useState } from "react";
import { SkeletonP } from "@/shared/components/skeleton/skeletonP";
import { TablaGenerica } from "@/shared/components/tabla/tabla";

export const ModalDetalle = ({
  id,
  idProducto,
}: {
  id: string;
  idProducto: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: historial,
    isLoading,
    isError,
  } = useInventariosHistorial(id, idProducto, isOpen);

  if (isLoading) {
    return <SkeletonP camposCabecera={["Cantidad", "Fecha Modificacion"]} />;
  }

  if (isError)
    return (
      <p className="text-center text-destructive mt-8">
        Error al cargar inventario.
      </p>
    );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Historial</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Historial de Actualizaciones</DialogTitle>
        </DialogHeader>

        <TablaGenerica
          campos={[
            { clave: "qty", titulo: "Cantidad" },
            {
              clave: "createdAt",
              titulo: "Fecha Modificacion",
              alignRight: true,
            },
          ]}
          datos={historial}
        />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
