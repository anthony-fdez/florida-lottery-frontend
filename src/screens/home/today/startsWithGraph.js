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

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const StartsWithGraph = ({ data }) => {
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

  const modalComponent = () => {
    return (
      <Modal show={isModalShown} onHide={() => setIsModalShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Como leer la grafica?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>X: Numero</p>
          <p>
            Y: Veces que ha salido un numero que empieza con correspondiente X
          </p>
          <br></br>
          <h4>Explicacion en detalle</h4>
          <p>
            La grafica es para ayudar a ver los numeros que han salido que
            empiezan con cada numero en el dia de hoy y manana
          </p>
          <br></br>
          <p>
            Por ejemplo ver que han salido numeros que empiezan con 4, 5 veces
            los lunes, comparado con la grafica de abajo que muestra el martes
          </p>
          <br></br>
          <p>
            El eje de las Y, o lo alto que sube la grafica muestra la cantidad
            de veces que ha salido un numero en las ultimas 56 semanas
          </p>
          <br></br>
          <p>
            Cada numero mostrado en el eje de las X, o horizontal en la grafica
            (va de 0 a 9), representa el primer numero de cada numero de 0 a 99
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsModalShown(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (today && tomorrow) {
    return (
      <div style={{ width: "100%" }}>
        {modalComponent()}
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
        <p>Something went wrong loading the graph's data, try again later</p>
      </>
    );
};

export default StartsWithGraph;
