// import Button from "./Button";

import { useState } from "react";

function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      const { _id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify(newTodoWithoutId),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        console.log("Erreur");
      }
    } catch (error) {
      console.log("Erreur");
    } finally {
      setLoading(false);
    }
  }
  return (
    <li
      className={
        "mb-10 d-flex flex-row justify-content-center align-items-center p-10"
      }
    >
      {loading ? (
        <span className="flex-fill">Chargement...</span>
      ) : (
        <span className="flex-fill">
          {todo.content} {todo.done && "✅"}
        </span>
      )}

      <button
        className="mr-15 btn btn-primary"
        // text="Valider"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, done: !todo.done });
        }}
      >
        {" "}
        Valider
      </button>

      <button
        className="mr-15 btn btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, edit: true });
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
