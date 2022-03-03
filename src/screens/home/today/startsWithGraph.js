import React, { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../tables/tables.css";

import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import getTodaysDayWord from "../../../functions/getTodaysDayWord";
import Table from "react-bootstrap/Table";
import { getNumbers } from "../../../functions/getNumbers";
import { Tooltip as BTooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DualGraphExplanaition from "../../../components/dualGraphExplanaition/dualGraphExplanaition";

const StartsWithGraph = ({ data, reloadData }) => {
  const [today, setToday] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    var date = new Date();
    const todayDay = date.getDay();

    const days = data.data;

    switch (todayDay) {
      case 0:
        setToday(days.sunday);
        setTomorrow(days.monday);
        break;
      case 1:
        setToday(days.monday);
        setTomorrow(days.tuesday);
        break;

      case 2:
        setToday(days.tuesday);
        setTomorrow(days.wednesday);
        break;

      case 3:
        setToday(days.wednesday);
        setTomorrow(days.thursday);
        break;

      case 4:
        setToday(days.thursday);
        setTomorrow(days.friday);
        break;

      case 5:
        setToday(days.friday);
        setTomorrow(days.saturday);
        break;

      case 6:
        setToday(days.saturday);
        setTomorrow(days.sunday);
        break;

      default:
    }
  }, [data]);

  const handleCloseModal = () => {
    setIsModalShown(false);
  };

  const todayVsTomorrow = () => {
    if (today && tomorrow) {
      return (
        <div style={{ width: "100%" }}>
          <DualGraphExplanaition
            isOpen={isModalShown}
            handleClose={handleCloseModal}
          />
          <p>Grafica muestra 56 semanas de historial de numeros</p>
          <br></br>
          <p onClick={() => setIsModalShown(true)} className="link">
            Como entender la grafica?
          </p>
          <br></br>
          <h3>Hoy</h3>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={today.startedWith}
              syncId="anyId"
              margin={{
                top: 10,
                right: 0,
                left: -35,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="number" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
          <h3>Manana</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={tomorrow.startedWith}
              syncId="anyId"
              margin={{
                top: 10,
                right: 0,
                left: -35,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="number" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    } else
      return (
        <>
          <p>No se pudo cargar la informacion, intente de nuevo</p>
          <div className="d-flex justify-content-center mt-2">
            {tryLoadDataAgain()}
          </div>
        </>
      );
  };

  const tryLoadDataAgain = () => {
    return (
      <>
        <Button
          onClick={() => {
            reloadData();
          }}
        >
          Intentar de nuevo
        </Button>
      </>
    );
  };

  const historial = () => {
    if (today) {
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
                {today.startedWith.map((started, index) => {
                  return (
                    <tr key={index}>
                      <td>{started.number}</td>
                      <td>{started.count}x</td>
                      <td>
                        {today.numbers.map((number, index) => {
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
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <br></br>
          <p>Todos los numeros que han salido los {getTodaysDayWord()}:</p>
          {today.numbers.map((number, index) => {
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
    } else {
      return (
        <>
          <p>No se pudo cargar la informacion, intentde nuevo</p>
          <div className="d-flex justify-content-center mt-2">
            {tryLoadDataAgain()}
          </div>
        </>
      );
    }
  };

  return (
    <Tabs
      defaultActiveKey="history"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="history" title="Historial">
        {historial()}
      </Tab>
      <Tab eventKey="graphs" title="Hoy & Manana">
        {todayVsTomorrow()}
      </Tab>
    </Tabs>
  );
};

export default StartsWithGraph;
