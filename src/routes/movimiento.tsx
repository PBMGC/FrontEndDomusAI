import { lazy } from "react";

const Movimiento = lazy(()=> import("../pages/movimientos/movimientos"))
const Vencimientos = lazy(()=> import("../pages/movimientos/vencimientos"))
const Reportes = lazy(()=> import("../pages/movimientos/reportes"))

const MovimientoRoutes = [
    {
        path:"movimientos",
        element:<Movimiento/>
    },
    {
        path:"vencimientos",
        element:<Vencimientos/>
    },
    {
        path:"reportes",
        element:<Reportes/>
    },
]

export default MovimientoRoutes