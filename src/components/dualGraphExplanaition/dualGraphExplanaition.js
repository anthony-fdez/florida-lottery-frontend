import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DualGraphExplanaition = ({ isOpen, handleClose }) => {
  return (
    <Modal show={isOpen} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Como leer la grafica?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>X: Numero</p>
        <p>
          Y: Veces que ha salido un numero que empieza con correspondiente X
        </p>
        <br></br>
        <h4>Explicacion en detalle</h4>
        <p>
          La grafica es para ayudar a ver los numeros que han salido que
          empiezan con cada numero en el dia de hoy y manana
        </p>
        <br></br>
        <p>
          Por ejemplo ver que han salido numeros que empiezan con 4, 5 veces los
          lunes, comparado con la grafica de abajo que muestra el martes
        </p>
        <br></br>
        <p>
          El eje de las Y, o lo alto que sube la grafica muestra la cantidad de
          veces que ha salido un numero en las ultimas 56 semanas
        </p>
        <br></br>
        <p>
          Cada numero mostrado en el eje de las X, o horizontal en la grafica
          (va de 0 a 9), representa el primer numero de cada numero de 0 a 99
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DualGraphExplanaition;
