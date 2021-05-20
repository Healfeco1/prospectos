import firebaseConfig from '../Services/firebase'
import firebase from 'firebase'

export const methods = {
    prospectos: (setData) => {
        let arr = []
        firebase.database().ref('prospectos').on('value', (snapshot) => {
            let obj = snapshot.val();
            if (obj) {
                for (let i of Object.entries(obj)) {
                    let prospectsObj = { ...i[1], ['id']: i[0] }
                    arr.push(prospectsObj)
                    setData(arr)
                }
            }
        })
        // const loginList = [];
        // const loginRef = firebase.database().ref('prospectos');
        // loginRef.once('value')
        // .then((prospectos)=>{
        //     let todos = prospectos.val()
        //     for(let i in todos){
        //         // //console.log(todos[i]);
        //         let prospectsObj = {... todos[i], ['id']: i} 
        //         loginList.push(prospectsObj)
        //         //console.log(prospectsObj);
        //         setData(prospectsObj)
        //     }
        // })
        // return loginList
        // loginList.map(val => //console.log(val))
        // //console.log(loginList);
        // //console.log(loginList);
        // return loginList

        // firebase.firestore().collection('prospectos')
        // .get()
        // .then(res =>{
        //     res.docs.map(prospectos => {
        //         //console.log(prospectos);
        //       let prospectsObj = {... prospectos.data(), ['id']: prospectos.id} 
        //       prospects.push(prospectsObj)
        //     });
        // })
    },
    getProspectById: (idProspect, setDataIdProspecto) => {
        //console.log('getProspectById');
        let loginList = {};
        const loginRef = firebase.database().ref(`prospectos/${idProspect}`);
        loginRef.once('value')
            .then((prospectos) => {
                // loginList.push(prospectos.val())
                let todos = prospectos.val()
                setDataIdProspecto(todos)
                // //console.log(todos.calle);
                loginList = todos
                // for(let i in todos){
                //     loginList[i]=todos[i]
                // }
            })
        return loginList
    },
    updateProspect: (data, idProspect) => {
        let id = JSON.stringify(idProspect)
        const logoutRef = firebase.database().ref(`/prospectos/${idProspect}`)
        Object.entries(data).map(val => {
            console.log(val);
            logoutRef.update({[val[0]]:val[1]})
        })
    },
    saveprospect: (data) => {
        console.log('saveMethod', data);
        var usersRef = firebase.database().ref('prospectos');
        data.status = "Enviado"
        usersRef.push(data)
    }
}