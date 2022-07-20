// import { useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
// import themeContext from "./context/theme";
// import todoReducer from "./reducers/todoReducer";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchTodoList() {
      const response = await fetch("https://restapi.fr/api/rtodo");
      try {
        if (response.ok) {
          const todos = await response.json();
          if (!shouldCancel) {
            if (Array.isArray(todos)) {
              setTodoList(todos);
            } else {
              setTodoList([todos]);
            }
          }
        } else {
          console.log("Erreur");
        }
      } catch (error) {
        console.log("Erreur");
      } finally {
        setLoading(false);
      }
    }

    fetchTodoList();
    return () => {
      shouldCancel = true;
    };
  }, []);

  function addTodo(todo) {
    // const todo = {
    //   content,
    //   done: false,
    //   edit: false,
    //   selected: false,
    // };
    setTodoList([...todoList, todo]);
  }

  function deleteTodo(_id) {
    setTodoList(todoList.filter((todo) => todo._id !== _id));
  }

  function toggleTodo(_id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      )
    );
  }

  function toggleTodoEdit(_id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id
          ? {
              ...todo,
              edit: !todo.edit,
            }
          : todo
      )
    );
  }

  function editTodo(_id, content) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id
          ? {
              ...todo,
              edit: false,
              content,
            }
          : todo
      )
    );
  }

  function selectTodo(_id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id
          ? {
              ...todo,
              selected: true,
            }
          : {
              ...todo,
              selected: false,
            }
      )
    );
  }

  // const [theme, setTheme] = useState("primary");

  // function handleChange(e) {
  //   setTheme(e.target.value);
  // }

  // const [state, dispatch] = useReducer(todoReducer, {
  //   theme: "primary",
  //   todoList: [],
  // });

  // function addTodo(content) {
  //   dispatch({
  //     type: "ADD_TODO",
  //     content,
  //   });
  // }
  // function deleteTodo(_id) {
  //   dispatch({
  //     type: "DELETE_TODO",
  //     _id,
  //   });
  // }
  // function toggleTodo(_id) {
  //   dispatch({
  //     type: "TOGGLE_TODO",
  //     _id,
  //   });
  // }
  // function toggleTodoEdit(_id) {
  //   dispatch({
  //     type: "TOGGLE_EDIT_TODO",
  //     _id,
  //   });
  // }
  // function editTodo(_id, content) {
  //   dispatch({
  //     type: "EDIT_TODO",
  //     content,
  //     _id,
  //   });
  // }
  // function selectTodo(_id) {
  //   dispatch({
  //     type: "SELECT_TODO",
  //     _id,
  //   });
  // }

  // function handleChange(e) {
  //   dispatch({
  //     type: "SET_THEME",
  //     theme: e.target.value,
  //   });
  // }

  return (
    // <themeContext.Prov_ider value={state.theme}>
    //   <div className="d-flex flex-row justify-content-center align-items-center p-20">
    //     <div className="card container p-20">
    //       <h1 className="mb-20 d-flex flex-row justify-content-center align-items-center">
    //         <span className="flex-fill">Todo list</span>
    //         <select
    //           name="theme"
    //           onChange={handleChange}
    //           value={state.theme}
    //           className="btn"
    //         >
    //           <option value="primary">Rouge</option>
    //           <option value="secondary">Indigo</option>
    //         </select>
    //       </h1>
    //       <AddTodo addTodo={addTodo} />
    //       <TodoList
    //         todoList={state.todoList}
    //         deleteTodo={deleteTodo}
    //         toggleTodo={toggleTodo}
    //         toggleTodoEdit={toggleTodoEdit}
    //         editTodo={editTodo}
    //         selectTodo={selectTodo}
    //       />
    //     </div>
    //   </div>
    // </themeContext.Prov_ider>

    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Todo list</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en courss</p>
        ) : (
          <TodoList
            todoList={todoList}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            toggleTodoEdit={toggleTodoEdit}
            editTodo={editTodo}
            selectTodo={selectTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
