import { lazy } from "react";

const Inicio = lazy(()=> import("../pages/inicio"))

const InicioRoute = [
    {
        path:"inicio",
        element:<Inicio/>
    }
]

export default InicioRoute