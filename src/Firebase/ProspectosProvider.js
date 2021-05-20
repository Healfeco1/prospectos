import React, { useEffect, useState } from 'react'
// intermediario entre firebase y componentes
import { methods } from './methods'
import firebase from 'firebase'


export default function ProspectosProvider(props) {
  const [prospectos, setData] = useState([])
  const [handleShowModal, sethandleShowModal] = useState(false);
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
    methods.saveprospect(data);
    getAllProspects();
  }
  // Update prospect
  const handledUpdateProspect = (data, idProspecto) => {
    methods.updateProspect(data, idProspecto);
    getAllProspects();
  }
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
      }}
    >
      {props.children}
    </prospectProviders.Provider>

  )
}

// Context Const
export const prospectProviders = React.createContext();