import React from 'react';
import InformacionTambo from '../components/utils/ObtenerInfoTambo';
import {ObtenerAnimalesPerfilForm} from '../components/utils/obtenerAnimalesPerfil';
import { FirebaseContext } from '../firebase2';
import Layout from '../components/layout/layout';
import { GiFarmer, GiTrashCan } from 'react-icons/gi';
import { FiLogOut } from "react-icons/fi";
import { Button, Alert, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { RiDeleteBin2Line } from 'react-icons/ri';

const UserProfile = () => {
  const { usuario, tamboSel, guardarTamboSel, firebase } = React.useContext(FirebaseContext);
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [error, guardarError] = React.useState(false);
  const [descError, guardarDescError] = React.useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function cerrarSesion() {
    guardarTamboSel(null);
    firebase.logout();
    return router.push('/login');
  }

  async function eliminarTambo() {
    try {
      await firebase.db.collection('animal').where('idtambo', '==', id).get().then(snapshotAnimal);
      if (animales.length == 0) {
        await firebase.db.collection('tambo').doc(id).delete();
        handleClose();
      } else {
        guardarDescError("No se puede eliminar el tambo, tiene animales asociados");
        guardarError(true);
      }
    } catch (error) {
      guardarDescError(error.message);
      guardarError(true);
    }
  }

  return (
    <Layout title="Mi Farmerin">
      <div className="farmerin-card-container">
        <div className="farmerin-card">
          {usuario ? (
            <div className="farmerin-card-infos">
              <div className="farmerin-card-image" style={{ marginRight: '15px' }}>
                <GiFarmer size={50} />
              </div>
              <div className="farmerin-card-info">
                <h5 className="farmerin-card-name">{usuario ? usuario.displayName : 'Invitado'}</h5>
                <p className="farmerin-card-tambo">{tamboSel ? tamboSel.nombre : 'No seleccionado'}</p>
              </div>
            </div>
          ) : (
            <Alert variant="warning">No hay información de usuario disponible.</Alert>
          )}
        </div>
        <div className="farmerin-card-actions" style={{ display: 'flex' }}>
          <InformacionTambo tambo={tamboSel} fetch={fetch} />
          <ObtenerAnimalesPerfilForm />
        </div>
      </div>
      <footer className="farmerin-footer">
        <button className="Btn-footer-perfil" onClick={cerrarSesion} style={{ marginRight: '5px' }}>
          <div className="sign-footer-perfil">
            <FiLogOut size={24} style={{color: '#fff'}}/>
          </div>
          <div className="text-footer-perfil">Cerrar Sesión</div>
        </button>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Borrar</Tooltip>}
        >
          <button className="button-borrar-tambo" onClick={handleShow} style={{ marginLeft: '5px' }}>
            <GiTrashCan className="svgIcon-borrar-tambo" />
          </button>
        </OverlayTrigger>
        <Modal
          className="warning-borrar-generala"
          show={show}
          onHide={handleClose}
          dialogClassName="modal-dialog-centered"
        >
          <Modal.Body>
            <div className="warning-borrar-general">
              <div className="confirmBorrar-div">
                <p>
                  <strong>¿Estás seguro de querer eliminar este {tamboSel ? tamboSel.nombre : 'No seleccionado'}?</strong>
                  <span>No podrás recuperar la información del tambo una vez eliminado</span>
                </p>
                <div className="modal-borrar-container">
                  <button className="red-btn-borrar" onClick={handleClose}>No, cancelar</button>
                  <button className="green-btn-borrar" onClick={eliminarTambo}>Borrar {tamboSel ? tamboSel.nombre : 'No seleccionado'}</button>
                </div>
              </div>
            </div>
            <Alert variant="danger" show={error}>
              <Alert.Heading>Oops! Se ha producido un error!</Alert.Heading>
              <p>{descError}</p>
            </Alert>
          </Modal.Body>
        </Modal>
      </footer>
    </Layout>
  );
};

export default UserProfile;         