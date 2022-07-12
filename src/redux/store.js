import { createStore,combineReducers } from 'redux'
import {CollApsedReducer} from './reducers/CollapseReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'FreshMeat',
    storage,
    blacklist:['LoadingReducer']
}

const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
} 
    