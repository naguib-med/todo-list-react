import { useState } from "react";
function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      setError(null);
      const { _id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify(newTodoWithoutId),
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log(response);
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        setError("Oops, une erreur");
      }
    } catch (error) {
      setError("Oops, une erreur");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter" && value.length) {
      // editTodo(value);
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      // editTodo(value);
      tryUpdateTodo({ ...todo, content: value, edit: false });
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
      <button
        onClick={() => tryUpdateTodo({ ...todo, edit: false })}
        className="btn btn-reverse-primary mr-15"
      >
        Annuler
      </button>

      <button onClick={handleClick} className="btn btn-primary">
        Sauvegarder
      </button>
    </div>
  );
}

export default EditTodo;
