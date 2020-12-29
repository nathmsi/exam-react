import React from "react";
import ReactDOM from "react-dom";


// main app
import Main from './pages/MainScreen'

// redux
import { Provider as ReduxProvider } from 'react-redux'

// persist redux store
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/reducers';


// translation
import './translation/i18n';

// scss files
import './styles/index.scss';

const App = () => {
    return (
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <Main />
            </PersistGate>
        </ReduxProvider>
    )
};



const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;


export default App;