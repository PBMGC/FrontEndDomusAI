import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/user.store";
import { useReporte } from "@/api/movimientos";
import { SkeletonP } from "@/shared/components/skeleton/skeletonP";
import { TablaGenerica } from "@/shared/components/tabla/tabla";
import type { Movimiento } from "@/shared/types/Movimiento";
import { setFechaFin, setFechaInicio } from "@/shared/utils/dateFormat";

const Reportes = () => {
  const user = useAuthStore((state) => state.user);
  const today = new Date();

  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
  });

  const {
    data: reporte,
    isLoading,
    isError,
  } = useReporte(user?.id || "", setFechaInicio(dateRange.startDate), setFechaFin(dateRange.endDate));

  if (isLoading) {
    return (
      <SkeletonP camposCabecera={["Producto", "Cantidad", "Costo Unitario"]} />
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
        <h1 className="text-3xl font-semibold text-primary">📦 REPORTE</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dateRange.startDate
                  ? format(dateRange.startDate, "dd/MM/yyyy")
                  : "Fecha inicio"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRange.startDate}
                onSelect={(date) =>
                  setDateRange((prev: any) => ({ ...prev, startDate: date }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dateRange.endDate
                  ? format(dateRange.endDate, "dd/MM/yyyy")
                  : "Fecha fin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRange.endDate}
                onSelect={(date) =>
                  setDateRange((prev: any) => ({ ...prev, endDate: date }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            onClick={() => setDateRange({ startDate: today, endDate: today })}
          >
            Reiniciar
          </Button>
        </div>
      </div>

      <TablaGenerica
        datos={reporte}
        campos={[
          {clave:"type",titulo:"Tipo"},
          { clave: "productName", titulo: "Producto" },
          { clave: "quantity", titulo: "Cantidad", alignCenter: true },
          {
            clave: "unitCost",
            titulo: "Costo Unitario",
            alignRight: true,
            render: (item: Movimiento) => `S/. ${item.unitCost}`,
          },
        ]}
      />
    </div>
  );
};

export default Reportes;