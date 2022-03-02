import React, { useEffect, useState } from "react";
import styles from "./today.module.css";

import Timer from "../../../components/timer/timer";

const Today = () => {
  const [timeDay, setTimeDay] = useState(null);
  const [timeNight, setTimeNight] = useState(null);

  useEffect(() => {
    const timeNow = new Date().getTime() / 1000;
    const day = returnTimeDay();
    const night = returnTimeNight();
  }, []);

  const returnTimeDay = () => {
    var day = new Date();
    day.setDate(day.getDate());
    day.setHours(13);
    day.setMinutes(30);
    day.setSeconds(0);
    day.setMilliseconds(0);

    return new Date(day).getTime() / 1000;
  };

  const returnTimeNight = () => {
    var night = new Date();
    night.setDate(night.getDate());
    night.setHours(13);
    night.setMinutes(30);
    night.setSeconds(0);
    night.setMilliseconds(0);

    return new Date(night).getTime() / 1000;
  };

  return (
    <div>
      <h3>Numeros de hoy</h3>
      <p>
        Medio dia: <span></span>
      </p>
      <p>
        Noche: <span></span>
      </p>
    </div>
  );
};

export default Today;
