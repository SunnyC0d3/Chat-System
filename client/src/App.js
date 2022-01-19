import './assets/scss/main.scss';
//Import Redux
import { store } from './Store';
import { Provider } from 'react-redux';

//import components
import Socket from './components/Socket';
import Dialog from './components/Dialog';
import UserPanel from './components/UserPanel';
import ChatPanel from './components/ChatPanel';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Socket />
        <UserPanel />
        <ChatPanel />
        <Dialog />
      </div>
    </Provider>
  );
}

export default App;
