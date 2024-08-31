import React from "react";

type VisitedPlace = {
  city: string;
  date: string;
}

type City = {
  city: string;
  count: number;
}

export interface VisitedPlacesProps {
  visitedPlaces: VisitedPlace[];
}


const VisitedPlaces: React.FC<VisitedPlacesProps> = ({visitedPlaces}) => {

    const createMostVisited = (list: VisitedPlace[]) => {
      const cities: Record<string, number> = {}

      list.forEach((item: VisitedPlace) => {
          if (cities[item.city]) {
              cities[item.city] += 1
          } else {
              cities[item.city] = 1
          }
      })

      const sorted = Object.keys(cities).sort((a, b) => cities[b] - cities[a])

      return sorted.map((city) => ({city, count: cities[city]}))
  }

  return (
    <>
      <h2 className="text-2xl font-bold  ">Locais Visitados</h2>
      <div className="bg-white rounded-lg h-full p-8 shadow-md">
          {createMostVisited(visitedPlaces).map((item: City, index: number) => (
            <React.Fragment key={index}>
              <div className="flex justify-between items-center">
                  <div className="flex">
                  <h3 className="text-md font-bold mr-2">{index+1 + ". "}</h3>
                  <h3 className="text-md font-normal">{item.city}</h3>
                  </div>
                  <h3 className="text-md ">{item.count}</h3>
              </div>
              <div className="my-2 w-full border border-gray-100  rounded-full"></div> 
              </React.Fragment>
          
        ))}
      </div>
     </>
  )
}

export default VisitedPlaces