import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Tooltip as BTooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";

import { getNumbers } from "../../functions/getNumbers";
import useIsLoaded from "../../functions/customHooks/useIsLoaded";

const Daily = () => {
  const isLoded = useIsLoaded();
  const [data, setData] = useState("loading");

  useEffect(() => {
    getDailyNumbersData();
  }, []);

  const getDailyNumbersData = () => {
    setData("loading");

    axios
      .get("https://bolitacuba.herokuapp.com/daily/year")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setData(null);
        console.log("Failed to get daily numbers data (today.js)");
        console.log(err);
      });
  };

  const historial = ({ day }) => {
    if (day) {
      return (
        <div>
          <div className="table-container">
            <Table className="">
              <thead>
                <tr>
                  <th style={{ minWidth: "150px" }}>Empieza con</th>
                  <th style={{ minWidth: "120px" }}>Ha salido</th>
                  <th>Numeros</th>
                </tr>
              </thead>
              <tbody>
                {day.startedWith.map((started, index) => {
                  return (
                    <tr key={index}>
                      <td>{started.number}</td>
                      <td>{started.count}x</td>
                      <td>
                        {day.numbers.map((number, index) => {
                          if (number[0] === started.number) {
                            return (
                              <OverlayTrigger
                                key={index}
                                placement="top"
                                overlay={
                                  <BTooltip>
                                    Significado:{" "}
                                    {getNumbers({ number: number })}
                                  </BTooltip>
                                }
                              >
                                <span className="link me-3">{number}</span>
                              </OverlayTrigger>
                            );
                          }
                          return null;
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <br></br>
          <p>Todos los numeros que han salido este dia:</p>
          {day.numbers.map((number, index) => {
            return (
              <OverlayTrigger
                index={index}
                placement="top"
                overlay={
                  <BTooltip>
                    Significado: {getNumbers({ number: number })}
                  </BTooltip>
                }
              >
                <span className="link me-2">{number} </span>
              </OverlayTrigger>
            );
          })}
        </div>
      );
    }
  };

  const returnAccordion = () => {
    if (data === "loading") {
      return (
        <div className="d-flex justify-content-center">
          <Spinner size="sm" animation="border" role="status" />
        </div>
      );
    } else if (!data) {
      <>
        <p>No se pudo cargar la informacion, intentde nuevo</p>
        <div className="d-flex justify-content-center mt-2">
          <Button onClick={() => getDailyNumbersData()}>
            Intentar de nuevo
          </Button>
        </div>
      </>;
    } else {
      return (
        <Accordion>
          <Accordion.Item eventKey="sunday">
            <Accordion.Header>Domingo</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.sunday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="monday">
            <Accordion.Header>Lunes</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.monday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="tuesday">
            <Accordion.Header>Martes</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.tuesday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="wednesday">
            <Accordion.Header>Miercoles</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.wednesday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="thursday">
            <Accordion.Header>Jueves</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.thursday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="friday">
            <Accordion.Header>Viernes</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.friday })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="saturday">
            <Accordion.Header>Sabado</Accordion.Header>
            <Accordion.Body>
              {historial({ day: data.data.saturday })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    }
  };

  return (
    <div className={isLoded ? "LOADED" : "NOT-LOADED"}>
      <div className="table-header">
        <h4>Historial por dia de la semana</h4>
        <hr></hr>
        {returnAccordion()}
      </div>
    </div>
  );
};

export default Daily;
