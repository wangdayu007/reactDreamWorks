import './App.css'
import { Provider } from 'react-redux';
import IndexRouter from './router/IndexRouter';
import {store,persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import clientHeader from './components/client-header';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRouter/>
      </PersistGate>
    </Provider>
  );
}

export default App;
