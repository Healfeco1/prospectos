import firebaseConfig from '../Services/firebase'
import firebase from 'firebase'

export const methods = {
    getAllProspectos: (setData) => {
        const db = firebase.firestore();
        return db.collection('prospectos').onSnapshot((snapshot) => {
          const postData = [];
          snapshot.forEach((doc) => postData.push({  id: doc.id, ...doc.data() }));
          setData(postData);
        });
    },
    getProspectById: (setProspecto)=>{
        let postData = []
        firebase.firestore().collection("prospectos").doc("mcNIRMPXppdHbd9KTKd4").get()
            // .then((doc) => postData.push({ ...doc.data() } ))
            .then((doc) => {setProspecto(prev=>[...prev, doc])})
            .catch((error) => { })
            // return postData
    }
}