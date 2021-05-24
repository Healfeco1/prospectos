import { useContext } from "react";
import { ToastProvider } from "react-toast-notifications";
import Prospectos from "./Components/Prospectos/Prospectos";
import ProspectosList from "./Components/Prospectos/ProspectosList";
import { prospectProviders } from "./Firebase/ProspectosProvider";
import ProgressBar from 'react-bootstrap/ProgressBar'


// function App() {
//   const {handleProspects} = useContext(prospectProviders)
//   // //console.log(handleProspects);
//   return (
//     <>
//           <ToastProvider>
//             {/* <Prospectos/> */}
//           </ToastProvider>
//           <ProspectosList />
//     </>
//   );

// }

import React, { useState } from 'react'
import firebase from './Services/firebase'

function App() {
  const [file, setImage] = useState('');
  const [bar, setBar] = useState('');
  const [url, setUrl] = useState('');
  const [progress1, setProgress] = useState('');
  const upload = () => {
    if (file == null)
      return;
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    // var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    // var mountainImagesRef = storageRef.child(`files/${image}`);

    // mountainImagesRef.put(image).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
    var uploadTask = storageRef.child(`files/${file.name}`).put(file);
    console.log('uploadTask: ', file.name);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        }
        setBar(
          <div className="col-md-6">
          <ProgressBar variant={ progress != 100 ? 'danger' : 'success'} animated={progress != 100} now={progress}  label={`${progress}%`}/>
          </div>
          // {/* <div class="progress"> */}
            // {/* <div class={`progress-bar ${progress!=100? 'progress-bar-striped progress-bar-animated w-25':'w-100'}`} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}%</div> */}
          // </div>
          )
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setUrl(downloadURL)
        setProgress(110)
        console.log('File available at', downloadURL);
      });
    });
  }

  const setFileName = objName => {
    console.log(objName[0].name);
    // setImage(objName.target.files[0])
  }

  return (
    <div className="App">
      <center>
        <input type="file" onChange={(e) => { console.log(e.target.files); setFileName(e.target.files); setImage(e.target.files[0]) }} />
        <button onClick={upload}>Upload</button>
        {progress1 == 110 ? '': bar}

        {progress1 == 110 ? <a className="d-block" href={url}>Documento</a>: ''}
      </center>
    </div>
  );
}

export default App;
