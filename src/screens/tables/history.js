import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import scrollToTop from "../../functions/scrollToTop";
import { getNumbers } from "../../functions/getNumbers";
import useIsLoaded from "../../functions/customHooks/useIsLoaded";
import getDateWords from "../../functions/getDateWords";

const History = () => {
  const isLoded = useIsLoaded();

  const [data, setData] = useState("loading");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedAll, setLoadedAll] = useState(false);

  const [loadingGif, setLoadingGif] = useState(null);

  const [isModalShown, setIsModalShown] = useState(false);
  const [modalNumber, setModalNumber] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex]);

  const getData = () => {
    setData("loading");
    axios
      .post(`https://bolitacuba.herokuapp.com/history`, {
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
      .post(`https://bolitacuba.herokuapp.com/history`, {
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
            Historial the todos los numberos que han salido, va hasta 04/29/88
          </h4>
          <hr></hr>
        </div>

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
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            {getDateWords({ date: row.date || "" })}
                          </Tooltip>
                        }
                      >
                        <span>{row.date}</span>
                      </OverlayTrigger>
                    </td>

                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            Significado: {getNumbers({ number: row.M || "" })}
                          </Tooltip>
                        }
                      >
                        <span
                          onClick={() => {
                            setIsModalShown(true);
                            setModalNumber(row.M);
                          }}
                          className="link"
                        >
                          {row.M}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            Significado: {getNumbers({ number: row.E || "" })}
                          </Tooltip>
                        }
                      >
                        <span
                          onClick={() => {
                            setIsModalShown(true);
                            setModalNumber(row.E);
                          }}
                          className="link"
                        >
                          {row.E}
                        </span>
                      </OverlayTrigger>
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
          <div className="table-load-all-container">
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

  const returnGraph = () => {
    console.log(data);
    return <div></div>;
  };

  const modalComponent = () => {
    return (
      <Modal show={isModalShown} onHide={() => setIsModalShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getNumbers({ number: modalNumber || "" })}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsModalShown(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className={isLoded ? "LOADED" : "NOT-LOADED"}>
      {modalComponent()}
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

export default History;
