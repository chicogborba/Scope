import { ChangeEvent, useState } from "react";
import 'leaflet/dist/leaflet.css';
import Sidebar from "../../components/Sidebar";
import { LatLngExpression } from "leaflet";
import { mock_data } from "../../mock/mock";
import useFeedbacksByPlace, { FeedbackItem } from "./useFeedbacksByPlace";
import Map from "./components/Map";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { collaborators_data } from "./data";



const FeedbacksByPlace = () => {

  // const { processFeedback, parseCoordinates, getNameInitials }
  //   = useFeedbacksByPlace();

  // const data = processFeedback(mock_data)
  // const initialPosition: LatLngExpression = [-30.034647, -51.217658]
  // const initialFeedbacks = Object.entries(data).find(([c]) => c === "Porto Alegre")?.[1].feedbacks || []
  // const filteredCities = Object.keys(data)

  // const [position, setPosition] = useState<LatLngExpression>(initialPosition)
  // const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks)

  // const onSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const city = e.target.value

  //   setPosition(parseCoordinates(
  //     Object.entries(data).find(([c]) => c === city)?.[1].coordinates || ""
  //   ))

  //   setFeedbacks(
  //     Object.entries(data).find(([c]) => c === city)?.[1].feedbacks || []
  //   )
  // }

  // const onMarkerClick = (feedbacks: FeedbackItem[], cords: string) => {
  //   setFeedbacks(feedbacks)
  //   setPosition(parseCoordinates(cords))
  // }


  return (
    <div className="flex flex-row h-screen">
      <Sidebar selected={"feedbackByPlace"} />
      <div className="w-full p-8 overflow-auto  shadow-xl m-8 rounded-xl ">
        <h2 className="text-3xl font-bold mt-1 mb-6">Feedbacks por localização</h2>
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl ">Cidades</h2>
          <select className="select w-full max-w-xs shadow-md rounded-xl">
            <option disabled >Escolha a cidade</option>
          </select>
        </div>
        <div className="mt-8 rounded-3xl shaodw-2xl overflow-hidden px-10 flex flex-col justify-center">
          <Map  />
          <div className="bg-white rounded-3xl h-full p-8 shadow-md  mt-8">
          <h2 className="text-2xl ">Pedidos de socorro por bairro</h2>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart style={{ marginTop: "2rem" }} data={collaborators_data}>
            <CartesianGrid vertical={false} stroke="#ECECEC" />
            <XAxis
              tickMargin={15}
              tickLine={false}
              axisLine={false}
              dataKey="year"
            />
            <YAxis
              tickMargin={15}
            />
            <Bar
              dataKey="revenue"
              fill="#4D3146"
              maxBarSize={30}
              radius={[7.5, 7.5, 7.5, 7.5]}
            />
          </BarChart>
        </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbacksByPlace