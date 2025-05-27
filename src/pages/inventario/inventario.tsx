import { useInventarios } from "@/api/inventario";
import { useAuthStore } from "@/user.store";
import { ModalAdd } from "./modalAdd";
import { ModalUpdate } from "./modalUpdate";
import { ModalDetalle } from "./modalDetalle";
import { SkeletonP } from "@/shared/components/skeleton/skeletonP";
import { TablaGenerica } from "@/shared/components/tabla/tabla";
import type { Inventory } from "@/shared/types/Inventory";

const Inventario = () => {
  const user = useAuthStore((state) => state.user);
  const {
    data: inventarios,
    isLoading,
    isError,
  } = useInventarios(user?.id || "");

  if (isLoading) {
    return (
      <SkeletonP
        camposCabecera={[
          "Nombre",
          "SKU",
          "Cost",
          "Cantidad",
          "Ultima Entrada",
          "Opciones",
        ]}
      />
    );
  }

  if (isError)
    return (
      <p className="text-center text-destructive mt-8">
        Error al cargar inventario.
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">📦 Inventario</h1>
        <ModalAdd id={user?.id || ""} />
      </div>

      <TablaGenerica
        campos={[
          { clave: "name", titulo: "Nombre" },
          { clave: "sku", titulo: "SKU" },
          { clave: "cost", titulo: "Costo" },
          { clave: "qty", titulo: "Cantidad" },
          {clave:"total",titulo:"VALOR TOTAL"},
          { clave: "last_entry", titulo: "Última entrada", alignRight: true },
        ]}
        datos={inventarios}
        renderOpciones={(item:Inventory) => (
          <div className="flex justify-end gap-2">
            <ModalUpdate
              id={user?.id || ""}
              qty={item.qty}
              idProducto={item.id}
            />
            <ModalDetalle id={user?.id || ""} idProducto={item.id} />
          </div>
        )}
      />
    </div>
  );
};

export default Inventario;
