import { useAuthStore } from "@/user.store"
import {useMutation} from "@tanstack/react-query"
import type { LoginFormValues } from "@/shared/schemas/login.schema"
import  supabase  from "@/shared/utils/supabaseClient"

export const useLogin = () => {
    const login = useAuthStore((state) => state.login)

    return useMutation({
        mutationFn:async({email,password}:LoginFormValues)=>{

            const {data,error} = await supabase.auth.signInWithPassword({
                email,password
            })

            if(error) throw new Error(error?.message||"ERROR AL INICIAR SESION")
            
            const userMetadata = data.user.user_metadata || {}
            const token = data.session.access_token
            login({id:data.user.id,email:data.user.email||email,preferencias:userMetadata.preferencias,token})
        }
    })
}