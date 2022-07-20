// import Button from "./Button";

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo, selectTodo }) {
  return (
    <li
      onClick={selectTodo}
      className={`mb-10 d-flex flex-row justify-content-center align-items-center p-10 ${
        todo.selected ? "selected" : ""
      }`}
    >
      <span className="flex-fill mr-15">
        {todo.content} {todo.done && "(✔️)"}{" "}
      </span>

      <button
        className="mr-15 btn btn-primary"
        // text="Valider"
        onClick={(e) => {
          e.stopPropagation();
          toggleTodo();
        }}
      >
        {" "}
        Valider
      </button>

      <button
        className="mr-15 btn btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          editTodo();
        }}
      >
        Modifier{" "}
      </button>

      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo();
        }}
      >
        {" "}
        Supprimer{" "}
      </button>
    </li>
  );
}

export default TodoItem;
