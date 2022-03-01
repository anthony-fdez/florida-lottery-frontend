import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>La bolita </h1>
      <hr></hr>
      <br></br>
      <div className="home-button-container">
        <h3>Ver numers organizados por mas reciente</h3>
        <button className="home-button">Ver mas reciente</button>
      </div>
      <div className="home-button-container">
        <h3>Ver numers organizados por los que mas tiempo hace que no salen</h3>
        <button className="home-button">Ver mas viejos</button>
      </div>
      <br></br>
      <h3>Como funciona?</h3>
      <p>
        Los sorteos de PICK 3 se llevan a cabo dos veces al día, los siete días
        de la semana, aproximadamente a la 1:30 p. m. y 9:45 p. m., hora del
        Este.
      </p>
    </div>
  );
};

export default Home;
