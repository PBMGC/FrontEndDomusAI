import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">

        <h1 className="text-6xl font-extrabold text-gray-800 mt-6">
          <span className="text-red-500">4</span>04
        </h1>

        <h2 className="text-xl text-gray-600 mt-4">
          <span className="text-red-400 font-bold mr-2">|</span> Página no encontrada
        </h2>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Ir a la página principal
        </Link>
      </div>
    </div>
  )
}

export default Error
