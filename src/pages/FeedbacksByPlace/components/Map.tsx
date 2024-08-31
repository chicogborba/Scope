import { LatLngExpression, divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import useFeedbacksByPlace, { FeedbackItem, FeedbackMap } from "../useFeedbacksByPlace";
import { MdLocationPin } from "react-icons/md";
import { renderToStaticMarkup } from "react-dom/server";

export interface MapProps {
  position: LatLngExpression;
  data: FeedbackMap;
  onMarkerClick: (feedbacks: FeedbackItem[], cord: string) => void;
}

const ChangeMapView = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  map.flyTo(position, map.getZoom());

  return null;
};

const Map: React.FC<MapProps> = ({
  position,
  data,
  onMarkerClick,
}) => {

  const {parseCoordinates} = useFeedbacksByPlace();

    const iconMarkup = renderToStaticMarkup(
    <MdLocationPin className="fill-primary w-10 h-10 mt-6"/>
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup,
      iconSize: [50, 50], // Ajuste conforme necessário
      className: "bg-transparent flex justify-center items-center",

    });

  return (
    <MapContainer  center={position} zoom={9} maxZoom={9} scrollWheelZoom={true} className="shadow-2xl rounded-3xl w-full h-96">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(data).map(([city, { coordinates, feedbacks }]) => (
          <Marker
              icon={customMarkerIcon}
              key={city}
              position={parseCoordinates(coordinates)}
              eventHandlers={{
                  click: () => onMarkerClick(feedbacks, coordinates ),
              }}
          >
              <Popup autoClose>{city}</Popup>
          </Marker>
      ))}
      <ChangeMapView position={position} />
  </MapContainer>
  )
}

export default Map