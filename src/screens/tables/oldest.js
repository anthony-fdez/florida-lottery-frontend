import axios from "axios";
import React, { useEffect, useState } from "react";
import "./tables.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import scrollToTop from "../../functions/scrollToTop";
import { getNumbers } from "../../functions/getNumbers";

const SortedOldest = () => {
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
  }, [currentPageIndex]);

  const getData = () => {
    setData("loading");
    axios
      .post(`http://localhost:9000/sorted/oldest`, {
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
      .post(`http://localhost:9000/sorted/oldest`, {
        start: currentPageIndex,
        end: currentPageIndex + 50000,
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
        <p>Organizado por numero que hace mas tiempo que no sale</p>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Numero</th>
                <th style={{ minWidth: "100px" }}>Ha salido</th>
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
                      {row.dates.map((date, index) => {
                        return (
                          <span key={index} style={{ marginRight: "10px" }}>
                            {date},
                          </span>
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
          )}{" "}
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
        ) : (
          <div></div>
        )}
      </>
    );
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
    <div>
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

export default SortedOldest;
