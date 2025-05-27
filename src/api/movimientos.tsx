import type { MovimientoFormValues } from "@/shared/schemas/movimientos.schema";
import { apiClient } from "@/shared/utils/apliClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMovimientos = (user_id: string, tipo: string) => {
  return useQuery({
    queryKey: [`movimientos_${tipo}`, user_id, tipo],
    queryFn: async () => {
      const { data } = await apiClient.get(`/movimientos/${tipo}`);
      return data;
    },
  });
};

export const useVencimientos = (user_id: string, tipo: string) => {
  return useQuery({
    queryKey: [`vencimientos_${tipo}`, user_id, tipo],
    queryFn: async () => {
      const { data } = await apiClient.get(`/movimientos/vencimientos/${tipo}`);
      return data;
    },
  });
}

export const useReporte = ( user_id: string,date_inicio: string, date_fin: string) => {
  return useQuery({
    queryKey: [`reporte_${date_inicio}_${date_fin}`, user_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/movimientos/reportes/${date_inicio}/${date_fin}`);
      return data;
    },
  });
}

export const useCreateMovimiento = () => {
  return useMutation({
    mutationFn: async ({ inventoryItem,quantity,type,unitCost,timeSpan,timeUnit }: MovimientoFormValues) => {
      const { status: response } = await apiClient.post("/movimientos", {
        inventoryItem,
        type,
        quantity,
        unitCost,
        timeSpan,
        timeUnit
      });
      return response;
    },
  });
};
