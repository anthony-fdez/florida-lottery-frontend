import React, { useEffect, useState } from "react";
import styles from "./yesterday.module.css";
import axios from "axios";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const Yesterday = () => {
  const [yesterdayNumbers, setYesterdayNumbers] = useState("loading");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setYesterdayNumbers("loading");

    axios
      .get("http://localhost:9000/yesterday")
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setYesterdayNumbers(response.data);
        }, 1000);
      })
      .catch((err) => {
        console.log("Failed to get yesterday numbers (today.js)");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Numeros de Ayer:</h3>
        {yesterdayNumbers === "loading" && (
          <Spinner size="sm" animation="border" role="status" />
        )}
      </div>
      {yesterdayNumbers ? (
        <>
          <p>
            Medio dia:{" "}
            <span>
              {(yesterdayNumbers !== "loading" && yesterdayNumbers.M) || "--"}
            </span>
          </p>
          <p>
            Noche:{" "}
            <span>
              {(yesterdayNumbers !== "loading" && yesterdayNumbers.E) || "--"}
            </span>
          </p>
        </>
      ) : (
        <div className={styles.error_container}>
          <p>
            Algo paso no se pudo obtener los numeros de ayer, vuelva a
            intentarlo mas tarde o apriete el boton de abajo.
          </p>
          <br></br>
          <Button onClick={() => getData()}>Intentar de nuevo</Button>
        </div>
      )}
    </div>
  );
};

export default Yesterday;
