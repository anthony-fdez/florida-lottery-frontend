import React from "react";
import { useNavigate } from "react-router";
import "./footer.css";

import scrollToTop from "../../functions/scrollToTop";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-container">
      <div className="footer-content-container">
        <h3>La Bolita</h3>
        <div>
          <ul>
            <li>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/");
                }}
                className="App-link"
              >
                Pagina principal
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/table/history");
                }}
                className="App-link"
              >
                Historial
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/table/up");
                }}
                className="App-link"
              >
                Menos repetidos
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/table/down");
                }}
                className="App-link"
              >
                Mas repetidos
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/table/oldest");
                }}
                className="App-link"
              >
                Mas viejos
              </button>
            </li>
          </ul>
        </div>
      </div>
      <br></br>
      <div className="footer-copyright-container">
        <p>©{new Date().getFullYear()} La Bolita LLC all rights reserved...</p>
        <p>
          Just kidding this is an open source project and both backend and
          frontend source code are available{" "}
          <a
            target="_blank"
            href="https://github.com/anthony-fdez/florida-lottery-frontend"
            rel="noreferrer"
          >
            here (frontend)
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            href="https://github.com/anthony-fdez/florida-lottery"
            rel="noreferrer"
          >
            here (backend)
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
