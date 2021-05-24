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
            logoutRef.update({ [val[0]]: val[1] })
        })
    },
    saveprospect: (data) => {
        data.status = "Enviado"
        let usersRef = firebase.database().ref('prospectos').push(data).key;
        let id = usersRef
        if (data.documentos) {
            Object.values(data.documentos).map((value, key) => {
                // let file = data.documentos[`documento${Math.round(keyIndex % 2)}`]
                let file = value.documento
                var storageRef = firebase.storage().ref();
                let folderName = id + '/' + file.name
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

/**
let documentoRef = `documento${(Math.round(keyIndex % 2) - 1)}`
                console.log("keyName: ", keyName, 'documentoRef: ', documentoRef);
                console.log(keyName == documentoRef);
                if (keyName == documentoRef) {
                    alert(keyName == documentoRef);
                    // let file = data.documentos[`documento${Math.round(keyIndex % 2)}`]
                    let file = data.documentos[keyName]
                    console.log('file: ', file);
                    // let file = keyName
                    alert(keyName);
                    alert(file);
                    var storageRef = firebase.storage().ref();
                    let folderName = id + '/' + file.name
                    var uploadTask = storageRef.child(folderName).put(file);
                    // let referenceURL = storageRef.child(folderName);
                    // referenceURL.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    //     console.log(downloadURL);
                    // })

                    uploadTask.on('', function (snapshot) {
                    }, function (error) {
                    }, function () {
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('File available at', downloadURL);
                            //   data.documentos[keyName] = downloadURL
                            // var updates = {};
                            // updates['prospectos/' + id] = data;
                            alert('msg1');
                            const url = firebase.database().ref('prospectos/' + id + '/documentos/' + keyName)
                            // url.set({
                            url.set(
                                // [documentos]: [keName=downloadURL]
                                // 'documentos': {
                                    // [`${keyName}`]: downloadURL
                                    downloadURL
                                // }
                            );

                            // const logoutRef = firebase.database().ref(`/${ref}/${idSesion}`)
                            // logoutRef.update({ login: 'false' })
                        })
                    })
                }
 */