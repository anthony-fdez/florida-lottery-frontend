import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import scrollToTop from "../../functions/scrollToTop";
import useIsLoaded from "../../functions/customHooks/useIsLoaded";
import { getNumbers } from "../../functions/getNumbers";
import getDateWords from "../../functions/getDateWords";

const SortedUp = () => {
  const isLoaded = useIsLoaded();

  const [data, setData] = useState("loading");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedAll, setLoadedAll] = useState(false);

  const [loadingGif, setLoadingGif] = useState(null);

  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const random = getRandomInt(24);

    const loadingFile = require(`../../assets/loading/loading${random}.gif`);

    setLoadingGif(loadingFile);
  }, []);

  useEffect(() => {
    getData();
  }, [currentPageIndex]);

  const getData = () => {
    setData("loading");
    axios
      .post(`https://bolitacuba.herokuapp.com/sorted/up`, {
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
      .post(`https://bolitacuba.herokuapp.com/sorted/up`, {
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
    if (data === "loading") return "Cargando...";

    return (
      <>
        <div className="table-header">
          <h4>
            Organizado de menor a mayor de acuerdo a cuantas veces ha salido
          </h4>
          <hr></hr>
        </div>
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
                  <tr key={`${index}sortedup`}>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            Significado:{" "}
                            {getNumbers({ number: row.number || "" })}
                          </Tooltip>
                        }
                      >
                        <span className="link">{row.number}</span>
                      </OverlayTrigger>
                    </td>

                    <td>{row.repeated}</td>
                    <td>
                      {row.dates.map((date, index) => {
                        return (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                {getDateWords({ date: date || "" })}
                              </Tooltip>
                            }
                          >
                            <span
                              key={`${index}sortedup-date`}
                              style={{ marginRight: "10px" }}
                            >
                              {date},
                            </span>
                          </OverlayTrigger>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="table-pagination-footer-container">
          {!loadedAll && (
            <>
              <Button
                disabled={currentPageIndex < 20 && true}
                onClick={() => previousPage()}
              >
                Anterior
              </Button>
              <span></span>
              <Button onClick={() => nextPage()}>Siguiente</Button>
            </>
          )}
        </div>

        {!loadedAll ? (
          <div>
            <hr></hr>
            <br></br>
            <div style={{ maxWidth: "400px", margin: "auto" }}>
              <Button style={{ width: "100%" }} onClick={() => loadAll()}>
                Cargar todos
              </Button>
              <p>
                Ver el hisorial completo va a consumir aproximadamente 500kb or
                0.5mb
              </p>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className={isLoaded ? "LOADED" : "NOT-LOADED"}>
      {renderTable()}
      <div
        className={
          data === "loading" && loadedAll
            ? "loading-screen-shown"
            : "loading-screen-hidden"
        }
      >
        {loadingFullPageComponent()}
      </div>
    </div>
  );
};

export default SortedUp;
