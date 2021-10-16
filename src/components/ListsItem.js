import "./ListsItem.scss";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

const ListsItem = () => {
  return (
    <div className="items">
      <div className="items__category">
        <span className="items__category__title">Grocery</span>
        <span className="items__category__count">{"5"} items remaining</span>
      </div>
      <div className="items__add-todo">
        <div className="add-todo">
          <input
            className="add-todo__input"
            placeholder="Create a new todo..."
          />
          <span className="add-todo__add">
            <div className="add-todo__add__btn">
              <FaPlusCircle />
            </div>
          </span>
        </div>
      </div>
      <ul className="items__lists">
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">apples</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">pineapples</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">Kiwi</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">Kiwi</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">Kiwi</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
        <li className="item">
          <div className="item__check">
            <FiCheck />
          </div>
          <span className="item__text">Kiwi</span>
          <span className="item__remove">
            <FiX />
          </span>
        </li>
      </ul>
      <div className="function">
        <span className="function__btn function__btn--green">
          Special Function
        </span>
        <span className="function__btn">Clear completed items</span>
        <span className="function__btn function__btn--red">
          Delete category
        </span>
      </div>
    </div>
  );
};

export default ListsItem;
