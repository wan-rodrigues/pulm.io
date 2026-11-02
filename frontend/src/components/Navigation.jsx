import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between">
      <h1 className="text-xl font-bold text-emerald-700">Pulmio</h1>

      <div className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-emerald-700">
          Início
        </Link>
        <Link to="/screening" className="text-gray-700 hover:text-emerald-700">
          Triagem
        </Link>
        <Link to="/upload" className="text-gray-700 hover:text-emerald-700">
          Upload
        </Link>
        <Link to="/result" className="text-gray-700 hover:text-emerald-700">
          Resultados
        </Link>
      </div>
    </nav>
  );
}
