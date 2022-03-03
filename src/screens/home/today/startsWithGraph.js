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

const StartsWithGraph = ({ data }) => {
  const [today, setToday] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);

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

  if (today && tomorrow) {
    return (
      <div style={{ width: "100%" }}>
        <p>
          Las graficas muestran en el eje de las Y la cantidad de veces que has
          salido un numero que empieza con el numero que le corresponde en el
          eje de las X
        </p>
        <br></br>
        <p>Hoy</p>
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
        <p>Manana</p>
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
