import React, { useEffect, useState } from 'react'
// intermediario entre firebase y componentes
import { methods } from './methods'


export default function ProspectosProvider(props) {
  const [prospectos, setData] = useState([])
  const [handleShowModal, sethandleShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState()
  const [prospectoAccion, setProspectoAccion] = useState()
  let resProspectos = []
  const getAllProspects = () => {
    methods.prospectos(setData);
  }
  useEffect(() => {
    getAllProspects()
  }, []);

  const getDataIdProspecto = (idProspect, setDataIdProspecto) => {
    methods.getProspectById(idProspect, setDataIdProspecto)
  }
  // Save prospect
  const handledSaveProspect = (data) => {
    methods.saveprospect(data, 'update');
    getAllProspects()
  }
  // Update prospect
  const handledUpdateProspect = (data, idProspecto) => {
    methods.updateProspect(data, idProspecto);

  }
  const setModalTitleName = (accion) => {
    switch (accion) {
      case 'visualizar':
        setTitleModal("DATOS DEL PROSPECTO")
        break;
      case 'evaluar':
        setTitleModal("EVALUACIÓN DEL PROSPECTO")
        break;
      case 'nuevo':
        setTitleModal("CAPTURA DE NUEVO PROSPECTO")
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setModalTitleName(prospectoAccion)
  }, [prospectoAccion])
  return (
    <prospectProviders.Provider
      value={{
        getAllProspects,
        resProspectos,
        prospectos,
        getDataIdProspecto,
        handledSaveProspect,
        handledUpdateProspect,
        sethandleShowModal,
        handleShowModal,
        titleModal,
        prospectoAccion,
        setProspectoAccion,
      }}
    >
      {props.children}
    </prospectProviders.Provider>

  )
}

// Context Const
export const prospectProviders = React.createContext();