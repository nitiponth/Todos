import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import "./Modal.scss";
import { StoreContext } from "../App";
const Modal = observer(() => {
  const todosCtx = useContext(StoreContext);
  return (
    <div className="Modal">
      <div className="Modal__title">Result of Assignment</div>
      <div className="Modal__answer Modal__answer--message">
        {todosCtx.specialFnResult.message}
      </div>
      <div className="Modal__answer Modal__answer--result">
        {todosCtx.specialFnResult.result}
      </div>
      <div className="Modal__desc">Click outside to close</div>
    </div>
  );
});

export default Modal;
