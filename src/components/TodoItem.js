import Button from "./Button";

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

      <Button
        className="mr-15"
        text="Valider"
        onClick={(e) => {
          e.stopPropagation();
          toggleTodo();
        }}
      />

      <Button
        className="mr-15"
        text="Modifier"
        onClick={(e) => {
          e.stopPropagation();
          editTodo();
        }}
      />

      <Button
        text="Supprimer"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo();
        }}
      />
    </li>
  );
}

export default TodoItem;
