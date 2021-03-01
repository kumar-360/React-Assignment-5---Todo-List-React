import React, { useState } from "react";
import "./style.css";

const ToDo = () => {
  const [listItem, setListItem] = useState([]);
  const [term, setTerm] = useState("");
  const [active, setActive] = useState("");
  const [hide, setHide] = useState("hide");
  const [editingValue, setEditingValue] = useState("");
  const [indexToBeEdited, setIndexToBeEdited] = useState(null);

  const addItem = () => {
    const list = [...listItem, term];
    if (term) setListItem(list);
    setTerm("");
  };
  const deleteItem = (i) => {
    const newRenderedList = listItem.filter((item) => {
      //console.log(i)
      return item !== i;
    });
    console.log(newRenderedList);
    //console.log(i)
    setListItem(newRenderedList);
  };
  const editItem = (item, index) => {
    setActive("active");
    setHide("");
    setEditingValue(item);
    setIndexToBeEdited(index);
  };
  const saveItem = () => {
    if (editingValue) {
      setHide("hide");
      setActive("");
      const newListItem = listItem.slice();
      newListItem[indexToBeEdited] = editingValue;
      setListItem(newListItem);
      // console.log(newListItem)
      // console.log(indexToBeEdited)
    }
  };
  const renderedList = listItem.map((item, index) => {
    return (
      <div key={index} className="list">
        <ul>
          <li>{item}</li>
          <button
            className="edit"
            passitem={item}
            passindex={index}
            onClick={(e) =>
              editItem(
                e.target.getAttribute("passitem"),
                e.target.getAttribute("passindex")
              )
            }
          >
            Edit
          </button>
          <button
            className="delete"
            passitem={item}
            onClick={(e) => deleteItem(e.target.getAttribute("passitem"))}
          >
            Delete
          </button>
        </ul>
      </div>
    );
  });
  return (
    <div>
      <textarea
        id="task"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      ></textarea>
      <button onClick={addItem} id="btn">
        Add
      </button>
      <div className={`${hide} ${active}`}>
        <textarea
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
        ></textarea>
        <button onClick={saveItem}>Save</button>
      </div>
      {renderedList}
    </div>
  );
};

export default ToDo;
