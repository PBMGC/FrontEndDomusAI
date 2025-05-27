import {z} from "zod"

export const registerSchema = z.object({
    email:z.string().email({message:"EMAIL INVALIDO"}),
    password: z.string()
})

export type RegisterFormValues = z.infer<typeof registerSchema>