import { ChangeEvent, useState } from "react";
import 'leaflet/dist/leaflet.css';
import Sidebar from "../../components/Sidebar";
import { LatLngExpression } from "leaflet";
import { mock_data } from "../../mock/mock";
import useFeedbacksByPlace, { FeedbackItem } from "./useFeedbacksByPlace";
import Map from "./components/Map";



const FeedbacksByPlace = () => {

  const { processFeedback, parseCoordinates, getNameInitials }
    = useFeedbacksByPlace();

  const data = processFeedback(mock_data)
  const initialPosition: LatLngExpression = [-30.034647, -51.217658]
  const initialFeedbacks = Object.entries(data).find(([c]) => c === "Porto Alegre")?.[1].feedbacks || []
  const filteredCities = Object.keys(data)

  const [position, setPosition] = useState<LatLngExpression>(initialPosition)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks)

  const onSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value

    setPosition(parseCoordinates(
      Object.entries(data).find(([c]) => c === city)?.[1].coordinates || ""
    ))

    setFeedbacks(
      Object.entries(data).find(([c]) => c === city)?.[1].feedbacks || []
    )
  }

  const onMarkerClick = (feedbacks: FeedbackItem[], cords: string) => {
    setFeedbacks(feedbacks)
    setPosition(parseCoordinates(cords))
  }

  return (
    <div className="flex flex-row h-screen">
      <Sidebar selected={"feedbackByPlace"} />
      <div className="w-full p-8 overflow-auto  shadow-xl m-8 rounded-xl ">
        <h2 className="text-3xl font-bold mt-1 mb-6">Feedbacks por localização</h2>
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl ">Cidades</h2>
          <select className="select w-full max-w-xs shadow-md rounded-xl" onChange={onSelectOption}>
            <option disabled >Escolha a cidade</option>
            {filteredCities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-8 rounded-3xl shaodw-2xl overflow-hidden px-10 flex flex-col justify-center">
          <Map data={data} position={position} onMarkerClick={onMarkerClick} />
          <div className="bg-white rounded-3xl h-full p-8 shadow-md -translate-y-16 ">
            {feedbacks.length > 0 && (
              <div className="flex flex-col mt-8">
                <div className="flex justify-between mx-16 py-4">
                  <div className="font-semibold">
                    Feedback
                  </div>
                  <div className="font-semibold">
                    Data da viajem
                  </div>
                </div>
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="border-gray-400 py-4 border-t flex justify-between ">
                    <div className="flex items-center ml-8">
                      <div className=" avatar placeholder">
                        <div className="bg-primary text-white rounded-full w-8">
                          <span className="text-xs">{getNameInitials(feedback.name)}</span>
                        </div>
                      </div>
                      <div className="font-normal ml-4">
                        {feedback.feedback}
                      </div>
                    </div>
                    <div className="font-normal mr-16">
                      {feedback.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbacksByPlace