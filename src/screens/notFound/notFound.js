import React from "react";
import "./notFound.css";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

import gif from "../../assets/404.gif";
import useIsLoaded from "../../functions/customHooks/useIsLoaded";

const NotFound = () => {
  const navigate = useNavigate();
  const isLoaded = useIsLoaded();

  return (
    <div className={isLoaded ? "LOADED" : "NOT-LOADED"}>
      <div className="not-found-container">
        <div>
          <img className="not-found-gif" alt="Not Found" src={gif} />
          <br></br>
          <p>La pagina que estas buscando no existe</p>
          <Button className="not-found-button" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
