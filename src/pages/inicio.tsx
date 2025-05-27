import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/user.store";
import { useInventarios } from "@/api/inventario";
import type { Inventory } from "@/shared/types/Inventory";

const Inicio = () => {
  const user = useAuthStore((state) => state.user);
  const {
    data: inventarios,
    isLoading,
    isError,
  } = useInventarios(user?.id || "");

  const dataTransformada = inventarios?.map((item:Inventory) => ({
    nameSKU:  item.name + " " + item.sku,
    cantidad: item.qty,
    total : item.total
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inventario por Producto</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {isLoading ? (
            <p>Cargando gráfico...</p>
          ) : isError ? (
            <p className="text-destructive">Error al cargar datos.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataTransformada}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nameSKU" tickLine={false} tickMargin={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>VALOR TOTAL EN INVENTARIO POR PRODUCTO</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {isLoading ? (
            <p>Cargando gráfico...</p>
          ) : isError ? (
            <p className="text-destructive">Error al cargar datos.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataTransformada}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nameSKU" tickLine={false} tickMargin={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Inicio;
