import 'leaflet/dist/leaflet.css';
import Sidebar from "../../components/Sidebar";
import Map from "./components/Map";
import Graph1 from "./components/graphs/Graph1";



const RoutePlanner = () => {

  return (
    <div className="flex flex-row h-screen">
      <Sidebar selected={"feedbackByPlace"} />
      <div className="w-full p-8 overflow-auto  shadow-xl m-8 rounded-xl ">
        <h2 className="text-3xl font-bold mt-1 mb-6 ml-12">Criar Rotas de Voo</h2>
        <div className="mt-8 rounded-3xl shaodw-2xl overflow-hidden px-10 flex flex-col justify-center">
          <Map  />
          <div className="bg-white rounded-3xl h-full p-8 shadow-md  mt-8">
          <h2 className="text-3xl  font-semibold">Pedidos de socorro por Bairro</h2>
          <Graph1/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoutePlanner