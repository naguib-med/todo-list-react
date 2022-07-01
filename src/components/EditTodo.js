import { useState } from "react";
import Button from "./Button";
function EditTodo({ todo, editTodo, cancelEditTodo }) {
  const [value, setValue] = useState(todo.content);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter" && value.length) {
      editTodo(value);
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      editTodo(value);
      setValue("");
    }
  }
  return (
    <div className="d-flex flex-row justify-content-center align-items-center mb-10">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ajouter une todo"
        className="mr-15 flex-fill"
      />
      <Button
        text="Annuler"
        onClick={cancelEditTodo}
        className="btn btn-reverse-primary mr-15"
      />

      <Button text="Sauvegarder" onClick={handleClick} />
    </div>
  );
}

export default EditTodo;
