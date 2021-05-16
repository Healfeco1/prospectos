import React, {useEffect, useState} from 'react'
// intermediario entre firebase y componentes
import {methods} from './methods'
import firebase from 'firebase'



export default function ProspectosProvider(props) {
    const [prospectos, setData] = useState({})

    useEffect(() => {
        const db = firebase.firestore();
        return db.collection('prospectos').onSnapshot((snapshot) => {
          // const postData = [];
          // snapshot.forEach((doc) => postData.push({  id: doc.id, ...doc.data() }));
          // setData(postData);
        });
      }, []);
    const getAllProspects = () => {
      methods.getAllProspectos(setData);
    }
    return (
        <prospectProviders.Provider
            value={{
              getAllProspects,
                prospectos
            }}
        >
        {props.children}
        </prospectProviders.Provider>

)
}

// Context Const
export const prospectProviders = React.createContext();