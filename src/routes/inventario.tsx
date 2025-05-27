import { lazy } from "react";

const Inventario = lazy(()=> import("../pages/inventario/inventario"))

const InventarioRoutes = [
    {
        path:"inventario",
        element:<Inventario/>
    }
]

export default InventarioRoutes