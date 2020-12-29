import "regenerator-runtime/runtime";
// redux
import { combineReducers, applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'

// persist redux store
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducers
import candidateReducer from './candidateReducer';

// Redux Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
    customer: candidateReducer,
})


const rootPersistConfig = {
    key: 'persist-data-weather',
    storage: storage,
    blacklist: ['customer'],
}


const pReducer = persistReducer(rootPersistConfig, reducers);


const store = createStore(pReducer, {}, composeWithDevTools(applyMiddleware(ReduxThunk)) );
const persistor = persistStore(store);

export {
    persistor,
    store
}