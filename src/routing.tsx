import { Suspense } from "react"
import { routes } from "./routes/routes"
import { useRoutes } from "react-router-dom"
import Loading from "./shared/components/loading/loading"


export const Routing = () => {
    const elements = useRoutes(routes)

    return(
        <Suspense fallback={<Loading/>}>
            {elements}
        </Suspense>
    )
}