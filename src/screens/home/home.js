import React from "react";
import { useNavigate } from "react-router";
import "./home.css";

// Bootstrap
import Button from "react-bootstrap/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>La bolita </h1>
      <hr></hr>
      <h3>Numeros de hoy</h3>
      <span>Medio dia: </span>
      <br></br>
      <span>Noche: </span>
      <br></br>
      <br></br>
      <h3>Ayer</h3>
      <span>Medio dia: </span>
      <br></br>
      <span>Noche: </span>
      <br></br>
      <br></br>
      <h3>Estadisticas</h3>
      <div className="home-button-container">
        <span>Ver historial de todos los mumeros</span>
        <Button
          onClick={() => navigate("/table/history")}
          className="home-button"
        >
          Historial
        </Button>
      </div>
      <div className="home-button-container">
        <span>
          Ver numeros ordenaods por los que menos han salido o los que mas han
          salido
        </span>
        <div className="d-flex">
          <Button
            onClick={() => navigate("/table/up")}
            className="home-button me-2"
          >
            Menos repetidos
          </Button>
          <Button
            onClick={() => navigate("/table/down")}
            className="home-button"
          >
            Mas repetidos
          </Button>
        </div>
      </div>
      <div className="home-button-container">
        <span>
          Ver numers organizados por los que mas tiempo hace que no salen
        </span>
        <Button
          onClick={() => navigate("/table/oldest")}
          className="home-button"
        >
          Mas viejos
        </Button>
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
