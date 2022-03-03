import React from "react";
import { useNavigate } from "react-router";
import "./home.css";

import scrollToTop from "../../functions/scrollToTop";

// Bootstrap
import Button from "react-bootstrap/Button";
import useIsLoaded from "../../functions/customHooks/useIsLoaded";
import Today from "./today/today";
import Yesterday from "./yesterday/yesterday";

const Home = () => {
  const navigate = useNavigate();
  const isLoaded = useIsLoaded();

  return (
    <div className={isLoaded ? "LOADED" : "NOT-LOADED"}>
      <div className="home-container">
        <h1>La Bolita </h1>
        <hr></hr>
        <Today />
        <br></br>
        <Yesterday />
        <br></br>
        <br></br>
        <h2>Estadisticas</h2>
        <hr></hr>
        <Button
          onClick={() => {
            scrollToTop();
            navigate("/stats");
          }}
          className="home-button"
        >
          Ver Estadisticas
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <h3>Como funciona?</h3>
        <p>
          Los sorteos de PICK 3 se llevan a cabo dos veces al día, los siete
          días de la semana, aproximadamente a la 1:30 p. m. y 9:45 p. m., hora
          del Este.
        </p>
      </div>
    </div>
  );
};

export default Home;
