import firebaseConfig from '../Services/firebase'
import firebase from 'firebase'
export const methods = {
    prospectos: (setdata) => {
        let arr = []
        firebase.database().ref('prospectos').once("value", snapshot => {
            let obj = snapshot.val();
            if (obj) {
                for (let i of Object.entries(obj)) {
                    let prospectsObj = { ...i[1], ['id']: i[0] }
                    arr.push(prospectsObj)
                    setdata(arr)
                }
            }
        })
    },
    dataTable: (setdata)=>{
        let arr = []
        firebase.database().ref('prospectos').on("value", snapshot => {
            let obj = snapshot.val();
            if (obj) {
                for (let i of Object.entries(obj)) {
                    let prospectsObj = { ...i[1], ['id']: i[0] }
                    arr.push(prospectsObj)
                    setdata(arr)
                }
            }
        })
    },
    getProspectById: (idProspect, setDataIdProspecto) => {
        let loginList = {};
        const loginRef = firebase.database().ref(`prospectos/${idProspect}`);
        loginRef.once('value')
            .then((prospectos) => {
                let todos = prospectos.val()
                setDataIdProspecto(todos)
                loginList = todos
            })
        return loginList
    },
    updateProspect: (data, idProspect) => {
        let id = JSON.stringify(idProspect)
        const logoutRef = firebase.database().ref(`/prospectos/${idProspect}`)
        Object.entries(data).map(val => {
            console.log(val);
            logoutRef.update({ [val[0]]: val[1] })
        })
    },
    saveprospect: (data) => {
        console.log(data.documentos);
        data.status = "Enviado"
        let usersRef = firebase.database().ref('prospectos').push(data).key;
        let id = usersRef
        if (data.documentos) {
            Object.values(data.documentos).map((value, key) => {
                let file = value.documento
                var storageRef = firebase.storage().ref();
                let folderName = ''
                if(file.name){
                    folderName = id + '/' + file.name
                }else{
                    folderName = id + '/' + data.documentos.nombre
                }
                console.log(file.name);
                var uploadTask = storageRef.child(folderName).put(file);

                uploadTask.on('', function (snapshot) {
                }, function (error) {
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        const url = firebase.database().ref('prospectos/' + id + '/documentos/' + key +'/documento')
                        url.set(
                            downloadURL
                        );
                    })
                })
            })
        }
    }
}