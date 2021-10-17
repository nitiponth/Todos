import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef } from "react";
import "./backdrop.scss";
import { StoreContext } from "../App";
const Backdrop = observer((props) => {
  const todosCtx = useContext(StoreContext);
  const backdropRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        todosCtx.showModal &&
        backdropRef.current &&
        !backdropRef.current.contains(e.target)
      ) {
        todosCtx.toggleModal();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [todosCtx.showModal, todosCtx]);

  return todosCtx.showModal ? (
    <div className="backdrop" onClick={() => todosCtx.toggleModal()}>
      {props.children}
    </div>
  ) : null;
});

export default Backdrop;
