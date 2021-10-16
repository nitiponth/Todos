import "./ListsCategory.scss";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const ListsCategory = () => {
  return (
    <div className="category">
      <h1 className="category__title">My Lists</h1>
      <ul className="category__box">
        <li className="category__item">Grocery</li>
        <li className="category__item">abcdefg</li>
        <li className="category__item">a1b2c3d4</li>
      </ul>
      <div className="category__add">
        <div className="add">
          <input className="add__input" placeholder="New category" />
          <span className="add__check">
            <div className="add__check__btn">
              <FaPlusCircle />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListsCategory;
