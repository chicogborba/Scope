import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { mock_data } from "../mock/mock";

const ClientList = () => {
  const [data, setData] = useState(mock_data);

  return (
    <div className="flex ">
      <Sidebar />
        <div
          className="grid-container  overflow-auto shadow-lg rounded-3xl  m-8"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 4rem)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
                  <h1
          className="text-3xl font-bold text-center mb-4 ml-2 self-start"
          style={{ color: "#333" }}
        >
          Pessoas localizadas
        </h1>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >

          {data.map(
            (item, index) => (
              console.log(item.image.url),
              (
                <Card
                key={index}
                coordinate={item.coordinate}
                image={item.image.url}
                />
              )
            )
          )}
          </div>
        </div>
    </div>
  );
};

export default ClientList;
