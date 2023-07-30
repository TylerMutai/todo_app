import TodoStruct from '../data/Todo';
interface Props {
  todo: TodoStruct;
  isChecked: boolean;
  onClick: (todo: TodoStruct) => void;
}
function SingleTodoLine({ todo, onClick, isChecked = false }: Props) {
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    onClick: onClick,
  };

  const checkboxStyle = {
    marginRight: '10px',
  };

  const textStyle = {
    margin: 0,
  };

  return (
    <div style={divStyle}>
      <input type='checkbox' style={checkboxStyle} />
      <p style={textStyle}>{todo.description}</p>
    </div>
  );
}

export default SingleTodoLine;
