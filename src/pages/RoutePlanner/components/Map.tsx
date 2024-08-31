import { LatLngExpression, divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, Polyline } from "react-leaflet";
import { MdLocationPin } from "react-icons/md";
import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import { bairros } from "../data";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbDrone } from "react-icons/tb";


export interface MapProps {
}

const AddMarkerOnClick = ({ onAddMarker }: { onAddMarker: (cord: LatLngExpression) => void }) => {
  useMapEvents({
    click: (e) => {
      onAddMarker(e.latlng); // Adiciona um marcador ao clicar no mapa
    },
  });
  return null;
};

const Map: React.FC<MapProps> = () => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [bestRoute, setBestRoute] = useState<LatLngExpression[]>([]);
  const [planePosition, setPlanePosition] = useState<LatLngExpression | null>(null);

  const iconMarkup = renderToStaticMarkup(
    <MdLocationPin className="fill-primary w-5 h-5 mt-6" />
  );

  const routeMarkup = renderToStaticMarkup(
    <FaLocationCrosshairs className="fill-[#c26dae] w-5 h-5 " />
  );

  const planeMarkup = renderToStaticMarkup(
    <TbDrone className="color-slate-500 w-8 h-8 mt-6" />
  );

  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [50, 50],
    className: "bg-transparent flex justify-center items-center",
  });

  const customRouteMarkupIcon = divIcon({
    html: routeMarkup,
    iconSize: [50, 50],
    className: "bg-transparent flex justify-center items-center",
  });

  const customPlaneIcon = divIcon({
    html: planeMarkup,
    iconSize: [30, 30],
    className: "bg-transparent flex justify-center items-center",
  });

  const calculateRoute = async () => {
    try {
      const response = await fetch('http://localhost:8080/calculate-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markers),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.best_route);
      setBestRoute(data.best_route);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMarker = (cord: LatLngExpression) => {
    setMarkers((prevMarkers) => [...prevMarkers, cord]);
  };

  useEffect(() => {
    if (bestRoute.length > 1) {
      let index = 0;
      const interval = setInterval(() => {
        setPlanePosition(bestRoute[index]);
        index = (index + 1) % bestRoute.length;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bestRoute]);

  const handleClearMarkers = () => {
    setMarkers([]);
    setBestRoute([]);
    setPlanePosition(null);
  };

  return (
    <div className="relative">
      <MapContainer
        center={{
  "lat": -30.0346,
  "lng": -51.2177
}}
        zoom={13}
        scrollWheelZoom={true}
        className="shadow-2xl rounded-3xl w-full h-[35rem]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bairros.map((bairro) => {
          const [lat, lng] = bairro.cord.split(",").map(Number);
          return (
            <Marker
              key={bairro.name}
              position={[lat, lng] as LatLngExpression}
              icon={customMarkerIcon}
            >
              <Popup autoClose>{bairro.name}</Popup>
            </Marker>
          );
        })}
        {markers.map((cord, index) => (
          <Marker key={index} position={cord} icon={customRouteMarkupIcon}>
            <Popup autoClose>Marcador Adicionado</Popup>
          </Marker>
        ))}
        {bestRoute.length > 0 && planePosition && (
          <Marker position={planePosition} icon={customPlaneIcon}>
            <Popup autoClose>Avião em movimento</Popup>
          </Marker>
        )}
        {bestRoute.length > 0 && (
          <Polyline
            positions={bestRoute}
            color="gray"
            weight={5}
            opacity={0.7}
          />
        )}
        <AddMarkerOnClick onAddMarker={handleAddMarker} />
      </MapContainer>
      <div className="flex gap-2 mt-3">
        <button onClick={handleClearMarkers} className="btn btn-sm btn-primary mb-4">Limpar pontos</button>
        <button onClick={calculateRoute} className="btn btn-sm border-2 border-primary bg-white mb-4">Enviar rota</button>
      </div>
    </div>
  );
};

export default Map;
