import TodoStoreImpl from "./store/TodoStore";
import { createContext } from "react";
import "./App.scss";
import ListsCategory from "./components/ListsCategory";
import ListsItem from "./components/ListsItem";
import Backdrop from "./components/backdrop";
import Modal from "./components/Modal";

export const StoreContext = createContext();

function App() {
  return (
    <StoreContext.Provider value={new TodoStoreImpl()}>
      <Backdrop>
        <Modal />
      </Backdrop>
      <div className="App">
        <div className="header">
          <img
            src="/images/moon-surface-3-land.jpg"
            alt="bg cover"
            className="header__img"
          />
        </div>
        <div className="container">
          <div className="content">
            <div className="title">
              <span>RabbitX TODOS</span>
            </div>
            <ListsCategory />
            <ListsItem />
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
