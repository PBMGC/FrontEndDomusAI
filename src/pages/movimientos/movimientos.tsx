import { useMovimientos } from "@/api/movimientos";
import { useAuthStore } from "@/user.store";
import { useState } from "react";
import { ModalAdd } from "./modalAdd";
import { SkeletonP } from "@/shared/components/skeleton/skeletonP";
import { TablaGenerica } from "@/shared/components/tabla/tabla";
import { SelectP } from "@/shared/components/select/select";
import type { Movimiento } from "@/shared/types/Movimiento";

const Movimiento = () => {
  const user = useAuthStore((state) => state.user);
  const [tipo, setTipo] = useState("ENTRY");

  const {
    data: movimientos,
    isLoading,
    isError,
  } = useMovimientos(user?.id || "", tipo);
  
  if (isLoading) {
    return <SkeletonP camposCabecera={["Producto", "Cantidad", "Fecha"]} />;
  }

  if (isError)
    return (
      <p className="text-center text-destructive mt-8">
        Error al cargar movimientos.
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-semibold text-primary">📦 Movimientos</h1>

        <div className="flex items-center gap-4">
          <SelectP
            valor={tipo}
            setValor={setTipo}
            opciones={["ENTRY", "EXIT", "SALE"]}
          />
          <ModalAdd id={user?.id || ""} />
        </div>
      </div>

      <TablaGenerica
        datos={movimientos}
        campos={[
          { clave: "productName", titulo: "Producto" },
          { clave: "quantity", titulo: "Cantidad", alignCenter: true },
          { clave: "created", titulo: "Fecha", alignCenter: true },
          ...(tipo === "ENTRY"
            ? [
                {
                  clave: "unitCost",
                  titulo: "Costo Unitario",
                  alignRight: true,
                  render: (item: Movimiento) => `S/. ${item.unitCost}`,
                },
                {
                  clave: "dateExpiraton",
                  titulo: "FECHA EXPIRACION",
                  alignRight: true,
                  render: (item: Movimiento) => `${item.dateExpiraton}`,
                }
              ]
            : tipo==="SALE"? [
               {
                  clave:"TOTAL",
                  titulo:"TOTAL",
                  render: (item: Movimiento) => `S/. ${item.unitCost * item.quantity}`
                }
            ]:[]),
        ]}
      />
    </div>
  );
};

export default Movimiento;
