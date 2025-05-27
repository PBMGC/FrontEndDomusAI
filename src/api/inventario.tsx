import { apiClient } from "@/shared/utils/apliClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {InventoryFormValues, InventoryUpdateValues} from "@/shared/schemas/inventory.schema"

export const useInventarios = (user_id: string,enabled=true) => {
  return useQuery({
    queryKey: ["inventarios", user_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/inventory`);
      return data;
    },
    enabled
  });
};

export const useInventariosHistorial = (user_id: string,producto_id:string,enabled=true) => {
  return useQuery({
    queryKey: ["inventarioHistorial", user_id,producto_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/inventory/${producto_id}`);
      return data;
    },
    enabled
  });
};
 
export const useCreateInventario = () => {
  return useMutation({
    mutationFn:async({name,sku}:InventoryFormValues)=>{
      const {status:response} = await apiClient.post("/inventory",{name,sku}) 
      return response;
    }
  })
};

export const useUpdateInventario = () =>{
  return useMutation({
    mutationFn:async({id,qty}:InventoryUpdateValues)=>{
      const {status:response} = await apiClient.patch(`/inventory/${id}`,{id,qty}) 
      return response;
    }
  })
}
 