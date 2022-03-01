import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

const SortedUp = () => {
  const [data, setData] = useState("loading");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/sorted/up`)
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
        <table>
          <tr>
            <th>Numero</th>
            <th>Ha Salido</th>
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

export default SortedUp;
