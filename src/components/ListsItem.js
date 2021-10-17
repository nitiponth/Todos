import React, { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { FaPlusCircle } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

import { StoreContext } from "../App";

import "./ListsItem.scss";
import { Fragment } from "react/cjs/react.production.min";
const ListsItem = observer(() => {
  const todoCtx = useContext(StoreContext);

  const inputRef = useRef();

  const onAddTodo = () => {
    const task = inputRef.current.value;
    if (task.trim() !== "") {
      todoCtx.addTask(todoCtx.currentWatch, task);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    inputRef.current.value = "";
  }, [todoCtx.currentWatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddTodo();
    }
  };

  const onToggle = (id) => {
    todoCtx.toggle(id);
  };

  const onRemove = (id) => {
    todoCtx.remove(id);
  };

  const todos = todoCtx.todos;

  const todoLists = todos
    .filter((todo) => todo.list === todoCtx.currentWatch)
    .map((todo) => {
      let checkStyle = "item__check";
      let textStyle = "item__text";
      if (todo.completed) {
        checkStyle = "item__check item__check--actived";
        textStyle = "item__text item__text--actived";
      }
      return (
        <li className="item" key={todo.id}>
          <div className={checkStyle} onClick={() => onToggle(todo.id)}>
            <FiCheck />
          </div>
          <span className={textStyle}>{todo.task}</span>
          <span className="item__remove" onClick={() => onRemove(todo.id)}>
            <FiX />
          </span>
        </li>
      );
    });

  let itemStyle = "items items--hidden";
  if (todoCtx.currentWatch !== null) {
    itemStyle = "items";
  }

  return (
    <Fragment>
      <div className={itemStyle}>
        <div className="items__category">
          <span className="items__category__title">
            {todoCtx.currentWatchName}
          </span>
          <span className="items__category__count">
            {todoCtx.currentWatchRemaining === 0
              ? "🎉  No task left  🎉"
              : `${todoCtx.currentWatchRemaining} tasks remaining`}
          </span>
        </div>
        <div className="items__add-todo">
          <div className="add-todo">
            <input
              ref={inputRef}
              className="add-todo__input"
              placeholder="Create a new todo..."
              onKeyDown={handleKeyDown}
            />
            <span className="add-todo__add">
              <div onClick={onAddTodo} className="add-todo__add__btn">
                <FaPlusCircle />
              </div>
            </span>
          </div>
        </div>
        <ul className="items__lists">{todoLists}</ul>
        <div className="function">
          <span
            className="function__btn function__btn--green"
            onClick={() => todoCtx.toggleModal()}
          >
            Special Function
          </span>
          <span
            className="function__btn"
            onClick={() => todoCtx.clearCompleted()}
          >
            Clear completed items
          </span>
          <span
            className="function__btn function__btn--red"
            onClick={() => todoCtx.deleteList()}
          >
            Delete category
          </span>
        </div>
      </div>
    </Fragment>
  );
});

export default ListsItem;
