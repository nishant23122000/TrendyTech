
import './App.scss';
import Task from './Components/Task/Task';
import Bucket from './Components/Bucket/Bucket';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./store/reducers/mainReducer";
function App() {
  const store = createStore(reducer, applyMiddleware(thunk))
  return (
    <Provider store={store} >
      <div className="App">
        <Task />
        <hr  />
        <Bucket />
      </div>
    </Provider>

  );
}

export default App;
