import React, { useContext, useState } from 'react'
import Prospectos from '../../Prospectos/Prospectos';
import { ToastProvider } from 'react-toast-notifications';
import { DefaultToastContainer } from 'react-toast-notifications';
import Button from 'react-bootstrap/Button'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'

import './styles.css'
import { prospectProviders } from '../../../Firebase/ProspectosProvider';

// Modificando la propiedad zindex para que muestre la alerta frente al modal
export const MyCustomToastContainer = props => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

export default function Modals({ idProspecto, setidProspecto }) {
  const { handleShowModal, sethandleShowModal, titleModal, prospectoAccion, setProspectoAccion } = useContext(prospectProviders)
  const [show, setShow] = useState(false);
  const handleClose = () => {
    if (prospectoAccion == 'nuevo') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: 'btn btn-success',
          confirmButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Saldrá de la pantalla de captura de prospectos y ningún dato será guardado',
        text: 'Si sale perderá toda la captura.',
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Seguir editando',
      }).then((result) => {
        if (result.isConfirmed) {
          // setShow(false)
          sethandleShowModal(false)
          setidProspecto(null)
        }
      })
    } else {
      sethandleShowModal(false)
      setidProspecto(null)
    }

  };
  const handleShow = () => {
    // setShow(true)
    setProspectoAccion("nuevo")
    sethandleShowModal(true)
  };
  return (
    <>
      <div className="text-center">
        <Button variant="outline-success" onClick={handleShow}>Capturar Prospecto</Button>
      </div>

      <Modal
        // show={show}
        show={handleShowModal}
        onHide={() => {
          // setShow(false); 
          sethandleShowModal(false);
          setidProspecto(null)
        }}
        dialogClassName="mod"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        // Impide utilizar la tecla esc
        keyboard={ prospectoAccion == 'nuevo' ? false : true}
      // Controla la vista del icono X en el modal
        closeButton={false}
      >
        {/* <Modal.Header closeButton > */}
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastProvider components={{ ToastContainer: MyCustomToastContainer }}>
            <Prospectos idProspecto={idProspecto}
              // setShow={setShow} 
              sethandleShowModal={sethandleShowModal}
            />
          </ToastProvider>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="outline-danger" onClick={handleClose}>Salir</Button>
          {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
        </Modal.Footer>
      </Modal>
      <span>{(idProspecto) ? idProspecto : ''}</span>
    </>
  )
}
