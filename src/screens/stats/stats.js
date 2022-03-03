import React from "react";
import "./stats.css";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import scrollToTop from "../../functions/scrollToTop";

const Stats = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Estadisticas</h2>
      <div className="home-button-container">
        <span>Ver historial de numeros por cada dia de la semana</span>
        <Button
          onClick={() => {
            scrollToTop();
            navigate("/table/daily");
          }}
          className="home-button"
        >
          Historial por dia
        </Button>
      </div>
      <div className="home-button-container">
        <span>Ver historial de todos los mumeros</span>
        <Button
          onClick={() => {
            scrollToTop();
            navigate("/table/history");
          }}
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
            onClick={() => {
              scrollToTop();
              navigate("/table/up");
            }}
            className="home-button me-2"
          >
            Menos repetidos
          </Button>
          <Button
            onClick={() => {
              scrollToTop();
              navigate("/table/down");
            }}
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
          onClick={() => {
            scrollToTop();
            navigate("/table/oldest");
          }}
          className="home-button"
        >
          Mas viejos
        </Button>
      </div>
      <br></br>
    </>
  );
};

export default Stats;
