import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form, Spinner, Alert, Table } from 'react-bootstrap';
import { RiAddBoxLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { GiInfo } from 'react-icons/gi';
import DetalleHorario from '../layout/detalleHorario';

const InformacionTambo = ({ tambo = {}, fetch }) => {
  const { id, nombre, ubicacion, turnos, bajadas, tolvas, link } = tambo || {};
  
  const [fecha, setFecha] = useState(format(Date.now(), 'yyyy-MM-dd'));
  const [horarios, setHorarios] = useState(null);
  const [estadoApi, setEstadoApi] = useState('');
  const [showData, setShowData] = useState(false);

  const handleShowData = () => setShowData(true);
  const handleCloseData = () => setShowData(false);

  const handleChange = e => setFecha(e.target.value);

  const buscarHorarios = async () => {
    setEstadoApi('buscando');
    const url = `${link}/horarios/${fecha}`;
    const login = 'farmerin';
    const password = 'Farmerin*2021';

    try {
      const api = await fetch(url, {
        headers: {
          'Authorization': 'Basic ' + btoa(`${login}:${password}`),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      const hs = await api.json();
      setHorarios(hs);
      setEstadoApi('resultados');
    } catch (error) {
      setEstadoApi('error');
    }
  };

  return (
    <>
      {tambo ? (
        <div className="card-fondoBotones">
        <div className="button-containerInfoTambo">
          <button className="custom-obtenerInfoTambo-button" style={{ "--clr": "#00ad54" }} onClick={handleShowData}>
            <span className="custom-obtenerInfoTambo-button-decor"></span>
            <div className="custom-obtenerInfoTambo-button-content">
              <div className="custom-obtenerInfoTambo-button__icon">
                <GiInfo size={24} style={{ color: '#fff' }}/>
              </div>
              <span className="custom-obtenerInfoTambo-button__text">Obtener Información del Tambo</span>
            </div>
          </button>
        </div>
        </div>
      ) : (
        <Alert variant="warning">Información del tambo no disponible</Alert>
      )}

      <Modal 
      className="warning-borrar-general"
      show={showData} 
      onHide={handleCloseData}
      dialogClassName="modal-dialog-centered"
      >
         <div className="warning-horarios-general">
         <div className="confirmHorarios-div">
       
          <Modal.Title className="modal-title-horarios">
          <p style={{ fontSize: '1.2rem' }}>
            <strong>Tambo {nombre}</strong>
          </p>
          </Modal.Title>
        <Modal.Body>
          <Row>
            <Col><strong>Ubicación: {ubicacion}</strong></Col>
          </Row>
          <Row className="text-center-horarios">
          <p className="text-center-horarios-p">
            <Col><span className="text-center-horarios-span">Turnos: {turnos}</span></Col>
            <Col><span className="text-center-horarios-span">Bajadas: {bajadas}</span></Col>
            <Col><span className="text-center-horarios-span">Kgs. Tolvas: {tolvas}</span></Col>
          </p>
          </Row>
          <Row>
            <br />
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
            <div className="modal-horarios-container">
              <button className="green-btn-horarios" variant="success" onClick={buscarHorarios}>Ver Horarios</button>
              </div>
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          {estadoApi === 'buscando' ? (
            <Spinner animation="border" variant="info" />
          ) : estadoApi === 'error' ? (
            <Alert variant="danger">No se puede acceder al tambo</Alert>
          ) : estadoApi === 'resultados' && (horarios && horarios.length === 0) ? (
            <Alert variant="success">No hay resultados para la fecha seleccionada</Alert>
          ) : estadoApi === 'resultados' && horarios && (
            <Table responsive>
              <thead>
                <tr>
                  <th>Turno</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                </tr>
              </thead>
              <tbody>
                {horarios.map(h => (
                  <DetalleHorario key={h.id} horario={h} />
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
        <div className="modal-horarios-container">
          <button className="red-btn-horarios" variant="info" onClick={handleCloseData}>Cerrar</button>
          </div>
        </Modal.Footer>
          </div>
        </div>
      </Modal>
    
    </>
  );
};

export default InformacionTambo;
