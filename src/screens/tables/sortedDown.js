import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import scrollToTop from "../../functions/scrollToTop";

const SortedDown = () => {
  const [data, setData] = useState("loading");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    getData();
  }, [currentPageIndex]);

  const getData = () => {
    setData("loading");
    axios
      .post(`http://localhost:9000/sorted/down`, {
        start: currentPageIndex,
        end: currentPageIndex + 75,
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        setData(null);
        console.log(err);
      });
  };

  const previousPage = () => {
    scrollToTop();
    setCurrentPageIndex((currentPageIndex) => currentPageIndex - 20);
  };

  const nextPage = () => {
    scrollToTop();
    setCurrentPageIndex((currentPageIndex) => currentPageIndex + 20);
  };

  const renderTable = () => {
    if (!data) return "No se pudo obtener la informacion";
    if (data === "loading") return "Cargando...";

    return (
      <>
        <p>Organizado de mayor a menor de acuerdo a cuantas veces ha salido</p>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Numero</th>
                <th style={{ minWidth: "100px" }}>Ha Salido</th>
                <th>Fechas</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.number}</td>
                    <td>{row.repeated}</td>
                    <td>
                      {row.dates.map((date) => {
                        return (
                          <span style={{ marginRight: "10px" }}>{date},</span>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="table-pagination-footer-container">
            <Button
              disabled={currentPageIndex < 20 && true}
              onClick={() => previousPage()}
            >
              Anterior
            </Button>
            <span></span>
            <Button onClick={() => nextPage()}>Siguiente</Button>
          </div>
        </div>
      </>
    );
  };

  return <div>{renderTable()}</div>;
};

export default SortedDown;
