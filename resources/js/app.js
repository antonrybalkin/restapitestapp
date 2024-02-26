import './assets/scss/app.scss';
import './bootstrap';

import React,{useState} from 'react';
import ComponentIntro from "./components/ComponentIntro"
import ComponentHeader from "./components/ComponentHeader"
import ComponentUsers from "./components/ComponentUsers"
import ComponentReagister from "./components/ComponentRegister"
import { LocalContext } from './components/Context';


function App() {
  const [re_render, setRe_Render] = useState(false);
    return (
        <LocalContext.Provider value={{re_render, setRe_Render}}>
            <ComponentHeader></ComponentHeader>
            <div className={"wrapper"}>
                <ComponentIntro></ComponentIntro>
                <ComponentUsers></ComponentUsers>
                <ComponentReagister></ComponentReagister>
            </div>
        </LocalContext.Provider>
    );
}

export default App;