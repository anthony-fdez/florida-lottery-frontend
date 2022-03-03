import React, { useEffect, useState } from "react";
import styles from "./today.module.css";
import axios from "axios";

import Timer from "../../../components/timer/timer";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const Today = () => {
  const [todayNumbers, setTodayNumbers] = useState("loading");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setTodayNumbers("loading");

    axios
      .get("http://localhost:9000/today")
      .then((response) => {
        setTodayNumbers(response.data);
      })
      .catch((err) => {
        setTodayNumbers(null);
        console.log("Failed to get today's numbers (today.js)");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Numeros de hoy</h3>
        {todayNumbers === "loading" && (
          <Spinner size="sm" animation="border" role="status" />
        )}
      </div>
      {todayNumbers ? (
        <>
          <p>
            Medio dia:
            {todayNumbers !== "loading" && todayNumbers.day.number === null ? (
              <span className="ms-1">Disponible a la 1:30PM - 13:30 horas</span>
            ) : (
              (
                <span>
                  {(todayNumbers !== "loading" && todayNumbers.day.number) ||
                    "--"}
                </span>
              ) -
              (
                <span>
                  {(todayNumbers !== "loading" && todayNumbers.day.fb) || "--"}
                </span>
              )
            )}
          </p>
          <p>
            Noche:{" "}
            {todayNumbers !== "loading" &&
            todayNumbers.night.number === null ? (
              <span className="ms-1">Disponible a la 9:45PM - 21:45 horas</span>
            ) : (
              (
                <span>
                  {(todayNumbers !== "loading" && todayNumbers.night.number) ||
                    "--"}
                </span>
              ) -
              (
                <span>
                  {(todayNumbers !== "loading" && todayNumbers.night.fb) ||
                    "--"}
                </span>
              )
            )}
          </p>
        </>
      ) : (
        <div className={styles.error_container}>
          <p>
            Algo paso no se pudo obtener los numeros de hoy, vuelva a intentarlo
            mas tarde o apriete el boton de abajo.
          </p>
          <br></br>
          <Button onClick={() => getData()}>Intentar de nuevo</Button>
        </div>
      )}
    </div>
  );
};

export default Today;
