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
    </div>
  );
};

export default Footer;
