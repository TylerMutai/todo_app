import React from 'react';

interface Props {
  addTodo: (todo: string) => void
}

function AddTodo({addTodo}: Props) {
  const [isAddingTodoActive, setIsAddingTodoActive] = React.useState(false);

  const [description, setDescription] = React.useState("");

  const toggleAddingTodo = React.useCallback(() => {
    setIsAddingTodoActive(!isAddingTodoActive);
  }, [isAddingTodoActive]);

  const handleTextAreaChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, [])

  const handleSaveTodo = React.useCallback(async () => {
    const res = window.confirm('Are you sure you want to save todo?');
    if (!res) return;
    addTodo(description)
  }, [description, addTodo])

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as any,
    width: "100%",
    padding: "30px",
    gap: "15px"
  }

  const buttonStyle = {
    borderRadius: "30px",
    backgroundColor: "black",
    color: "white",
    padding: "5px 15px",
    textTransform: "capitalize" as any
  }

  return (
    <div style={divStyle}>
      <button style={buttonStyle} onClick={toggleAddingTodo}>
        {isAddingTodoActive ? "Hide" : "show"} {" "} todo
      </button>
      {isAddingTodoActive && <textarea onChange={handleTextAreaChange} placeholder={"Enter todo description"}>
     </textarea>}
      {isAddingTodoActive && <button style={buttonStyle} onClick={handleSaveTodo}>
        Save todo
      </button>}
    </div>
  );
}

export default AddTodo;