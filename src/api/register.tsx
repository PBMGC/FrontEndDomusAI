import {useMutation} from "@tanstack/react-query"
import supabase from "@/shared/utils/supabaseClient"
import type { RegisterFormValues } from "@/shared/schemas/register.schema"

export const useRegister = () => {

    return useMutation({
        mutationFn:async({email,password}:RegisterFormValues)=>{
            const {data,error} = await supabase.auth.signUp({
                email,
                password,
                options:{
                    data:{
                        preferencias:{}
                    }
                }
            })

            if(error){ throw new Error(error?.message||"ERROR AL REGISTRAR")}
            
            return data;
        }
    })
}