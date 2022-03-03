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
      .get("https://bolitacuba.herokuapp.com/today")
      .then((response) => {
        console.log(response.data);

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
      .get("https://bolitacuba.herokuapp.com/daily/year")
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

  const getMidDayNumber = () => {
    if (todayNumbers === "loading") return "--";
    if (!todayNumbers) return "Algo paso, intente mas tarde";
    if (todayNumbers.day.number === null) return "Disponible 1:30PM";

    return `${todayNumbers.day.number} - ${todayNumbers.day.fb}`;
  };

  const getNightNumber = () => {
    if (todayNumbers === "loading") return "--";
    if (!todayNumbers) return "Algo paso, intente mas tarde";
    if (todayNumbers.night.number === null) return "Disponible 9:45PM";

    return `${todayNumbers.night.number} - ${todayNumbers.night.fb}`;
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
          <br></br>
          <div className={styles.numbers_container}>
            <div className={styles.numbers}>
              <p>Medio Dia</p>
              <span>{getMidDayNumber()}</span>
            </div>

            <div className={styles.numbers}>
              <p>Noche</p>
              <span>{getNightNumber()}</span>
            </div>
          </div>
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
