import TodoStruct from "../data/TodoStruct";
import React from "react";
import SingleTodoLine from "./SingleTodoLine";
import AddTodo from "./AddTodo";


function MainTodoList() {
  const [todoList, setToDoList] = React.useState(new Map<number, TodoStruct>());
  const [completedTodoList, setCompletedTodoList] = React.useState(new Map<number, TodoStruct>());

  const generateIdNumber = React.useCallback(() => {
    let currentId = completedTodoList.size;
    while (todoList.has(currentId) || completedTodoList.has(currentId)) {
      currentId++;
    }
    return currentId;
  }, [todoList, completedTodoList]);

  const handleAddTodo = React.useCallback((description: string) => {
    const todo: TodoStruct = {
      id: generateIdNumber(),
      description: description
    };
    const newTodoList = new Map(todoList);
    newTodoList.set(todo.id, todo);
    setToDoList(newTodoList);

  }, [generateIdNumber, todoList]);

  const deleteTodo = React.useCallback((todo: TodoStruct) => {
    const newTodoList = new Map(todoList);
    const newCompletedTodoList = new Map(completedTodoList);
    if (newTodoList.has(todo.id)) {
      newTodoList.delete(todo.id);
    }
    if (newCompletedTodoList.has(todo.id)) {
      newCompletedTodoList.delete(todo.id);
    }
    setToDoList(newTodoList);
    setCompletedTodoList(completedTodoList);
  }, [completedTodoList, todoList])


  const handleCompleteTodo = React.useCallback((todo: TodoStruct) => {
    const newTodoList = new Map(todoList);
    const newCompletedTodoList = new Map(completedTodoList);
    if (newTodoList.has(todo.id)) {
      newCompletedTodoList.set(todo.id, todo);
      newTodoList.delete(todo.id);
    } else {
      newTodoList.set(todo.id, todo);
      newCompletedTodoList.delete(todo.id);
    }
    setToDoList(newTodoList);
    setCompletedTodoList(completedTodoList);

  }, [completedTodoList, todoList])

  const mainDivStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as any
  }

  const secondaryMainDivStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxHeight: "100vh",
    overflow: "auto"
  }
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as any,
    width: "100%"
  }

  const completedTodoListArr = Array.from(completedTodoList.values());
  const todoListArr = Array.from(todoList.values());

  return (
    <div style={mainDivStyle}>
      <AddTodo addTodo={handleAddTodo}/>
      <div style={secondaryMainDivStyle}>
        <div style={divStyle}>
          {/*  Todos */}
          {todoListArr.map(todo => <SingleTodoLine todo={todo} isChecked={false} onClick={handleCompleteTodo}/>)}
        </div>
        <div style={divStyle}>
          {/*  Completed todos */}
          {completedTodoListArr.map(todo => <SingleTodoLine todo={todo} isChecked={true}
                                                            onClick={handleCompleteTodo}/>)}
        </div>
      </div>
    </div>
  )
}

export default MainTodoList;
