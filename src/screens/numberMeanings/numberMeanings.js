import React from "react";
import "./numberMeanings.css";
import "../tables/tables.css";

import Table from "react-bootstrap/Table";
import { getNumbers } from "../../functions/getNumbers";

const NumberMeanings = () => {
  return (
    <>
      <div className="table-header">
        <h4>Significado de cada numero</h4>
        <hr></hr>
      </div>
      <div className="table-container">
        <Table>
          <thead>
            <tr>
              <th>Numero</th>
              <th style={{ minWidth: "100px" }}>Significado</th>
            </tr>
          </thead>
          <tbody>
            {getNumbers({ number: "all" }).map((number, index) => {
              return (
                <tr key={index}>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  <td>{number[index + 1]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default NumberMeanings;
