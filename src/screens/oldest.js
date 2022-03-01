import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

const SortedOldest = () => {
  const [data, setData] = useState("loading");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/sorted/oldest`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        setData(null);
        console.log(err);
      });
  }, []);

  const renderTable = () => {
    if (!data) return "No se pudo obtener la informacion";
    if (data === "loading") return "Cargando...";

    return (
      <>
        <p>Organizado por numero que hace mas tiempo que no sale</p>
        <table>
          <tr>
            <th>Numero</th>
            <th style={{ minWidth: "80px" }}>Ha salido</th>
            <th>Fechas</th>
          </tr>

          {data.table.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.number}</td>
                <td>{row.repeated}</td>
                <td>
                  {row.dates.map((date) => {
                    return <span style={{ marginRight: "10px" }}>{date},</span>;
                  })}
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  };

  return <div>{renderTable()}</div>;
};

export default SortedOldest;
