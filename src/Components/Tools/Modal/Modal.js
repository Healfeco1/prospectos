import React from 'react'
import Prospectos from '../../Prospectos/Prospectos';
import { ToastProvider } from 'react-toast-notifications';
import { DefaultToastContainer } from 'react-toast-notifications';

// Modificando la propiedad zindex para que muestre la alerta frente al modal
export const MyCustomToastContainer = props => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

export default function Modal({ idProspecto }) {
  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New message</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ToastProvider components={{ ToastContainer: MyCustomToastContainer }}>
                <Prospectos idProspecto={idProspecto} />
              </ToastProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
