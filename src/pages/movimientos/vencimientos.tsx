import { useVencimientos } from "@/api/movimientos";
import { useAuthStore } from "@/user.store";
import { useState } from "react";
import { SkeletonP } from "@/shared/components/skeleton/skeletonP";
import { TablaGenerica } from "@/shared/components/tabla/tabla";
import { SelectP } from "@/shared/components/select/select";

const Vencimientos = () => {
  const user = useAuthStore((state) => state.user);
  const [tipo, setTipo] = useState("PROXIMO");

  const {
    data: vencimientos,
    isLoading,
    isError,
  } = useVencimientos(user?.id || "", tipo);

  if (isLoading) {
    return (
      <SkeletonP
        camposCabecera={[
          "Producto",
          "Cantidad",
          "Fecha Vencimiento",
          "Costo Unitario",
        ]}
      />
    );
  }

  if (isError)
    return (
      <p className="text-center text-destructive mt-8">
        Error al cargar vencimientos.
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-semibold text-primary">📦 VENCIMIENTOS</h1>

        <div className="flex items-center gap-4">
          <SelectP
            valor={tipo}
            setValor={setTipo}
            opciones={["PROXIMO", "VENCIDO"]}
          />
        </div>
      </div>

      <TablaGenerica
        datos={vencimientos}
        campos={[
          { clave: "productName", titulo: "Producto" },
          { clave: "quantity", titulo: "Cantidad", alignCenter: true },
          {
            clave: "dateExpiraton",
            titulo: "Fecha Vencimiento",
            alignCenter: true,
          },
          {
            clave: "unitCost",
            titulo: "Costo Unitario",
            alignRight: true,
            render: (item: any) => `S/. ${item.unitCost}`,
          },
        ]}
      />
    </div>
  );
};

export default Vencimientos;
