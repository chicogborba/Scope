
import React from "react";

export interface CardProps {
  coordinate: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ coordinate, image }) => {
  return (
    <div className="card" style={{
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "400px",
      width: "400px",
      backgroundColor: "white",
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)",
      margin: "10px",
    }}>
      <div className="coordinate" style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>{coordinate} </div>
      <img src={image} alt="Coordinate visual" className="image" style = {{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
      }} />
    </div>
  );
}

export default Card;
