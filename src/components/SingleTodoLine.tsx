import React from "react";
import TodoStruct from "../data/TodoStruct";

interface Props {
  todo: TodoStruct;
  isChecked: boolean;
  onChecked: (todo: TodoStruct) => void;
  onDeleted: (todo: TodoStruct) => void;
}

function SingleTodoLine({todo, onChecked, onDeleted, isChecked = false}: Props) {
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginBottom: "5px"
  };

  const checkboxStyle = {
    marginRight: '10px',
    textDecoration: isChecked ? 'line-through' : 'none'
  };

  const textStyle = {
    margin: 0,
    textDecoration: isChecked ? 'line-through' : 'none'
  };

  const buttonStyle = {
    borderRadius: "10px",
    backgroundColor: "red",
    color: "white",
    fontSize: "12px",
    textDecoration: isChecked ? 'line-through' : 'none',
    marginLeft: "5px",
    cursor: "pointer",
    height: "20px"
  }

  return (
    <div style={divStyle} onClick={() => onChecked(todo)}>
      <input readOnly={true} checked={isChecked} type='checkbox' style={checkboxStyle}/>
      <p style={textStyle}>{todo.description}</p>
      <button onClick={e => {
        e.stopPropagation();
        onDeleted(todo)
      }} style={buttonStyle}>X
      </button>
    </div>
  );
}

export default SingleTodoLine;
