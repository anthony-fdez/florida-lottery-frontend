import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import scrollToTop from "../../functions/scrollToTop";

const History = () => {
  const [data, setData] = useState("loading");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedAll, setLoadedAll] = useState(false);

  const [loadingGif, setLoadingGif] = useState(null);

  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(13);

    const loadingFile = require(`../../assets/loading/loading${random}.gif`);

    setLoadingGif(loadingFile);
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex]);

  const getData = () => {
    setData("loading");
    axios
      .post(`http://localhost:9000/history`, {
        start: currentPageIndex,
        end: currentPageIndex + 75,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setData(null);
        console.log(err);
      });
  };

  const loadAll = () => {
    setData("loading");
    setLoadedAll(true);

    axios
      .post(`http://localhost:9000/history`, {
        start: currentPageIndex,
        end: currentPageIndex + 25000,
      })
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
        }, 5000);
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

  const loadingFullPageComponent = () => {
    return (
      <div className="full-screen-loader">
        <img alt="loading" src={loadingGif} />
      </div>
    );
  };

  const renderTable = () => {
    if (!data) return "No se pudo obtener la informacion";
    if (data === "loading" && loadedAll) return loadingFullPageComponent();
    if (data === "loading") return "Cargando...";

    return (
      <>
        <p>
          Historial the todos los numberos que han salido, va hasta 04/29/88
        </p>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Dia</th>
                <th>Noche</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.M}</td>
                    <td>{row.E}</td>
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
          {!loadedAll ? (
            <div>
              <br></br>
              <Button onClick={() => loadAll()}>Cargar todos</Button>
              <p>
                Cargar el historial de numeros completo puede gastar hasta 14mb
                y relentizar tu telefono
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  };

  return <div>{renderTable()}</div>;
};

export default History;
