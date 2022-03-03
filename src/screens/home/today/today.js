import React, { useEffect, useState } from "react";
import styles from "./today.module.css";
import axios from "axios";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import getTodaysDayWord from "../../../functions/getTodaysDayWord";
import StartsWithGraph from "./startsWithGraph";

const Today = () => {
  const [todayNumbers, setTodayNumbers] = useState("loading");
  const [dailyNumbersData, setDailyNumbersData] = useState("loading");

  useEffect(() => {
    getData();
    getDailyNumbersData();
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

  const getDailyNumbersData = () => {
    setDailyNumbersData("loading");

    axios
      .get("http://localhost:9000/today")
      .then((response) => {
        setDailyNumbersData(response.data);
      })
      .catch((err) => {
        setDailyNumbersData(null);
        console.log("Failed to get daily numbers data (today.js)");
        console.log(err);
      });
  };

  const returnStartsWithGraph = () => {
    if (dailyNumbersData === "loading") {
      return (
        <div className="d-flex justify-content-center">
          <Spinner size="sm" animation="border" role="status" />
        </div>
      );
    } else if (!dailyNumbersData) {
      return <p>Could not load data for the Graphs</p>;
    } else return <StartsWithGraph data={dailyNumbersData} />;
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
      <br></br>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Ver numeros que han salido {getTodaysDayWord()} anteriores
          </Accordion.Header>
          <Accordion.Body>{returnStartsWithGraph()}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Today;
