import { useContext } from "react";
import { ToastProvider } from "react-toast-notifications";
import Prospectos from "./Components/Prospectos/Prospectos";
import ProspectosList from "./Components/Prospectos/ProspectosList";
import { prospectProviders } from "./Firebase/ProspectosProvider";


function App() {
  const {handleProspects} = useContext(prospectProviders)
  // //console.log(handleProspects);
  return (
    <>
          <ToastProvider>
            {/* <Prospectos/> */}
          </ToastProvider>
          <ProspectosList />
    </>
  );
}

export default App;
