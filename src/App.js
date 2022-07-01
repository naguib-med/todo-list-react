import { useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import themeContext from "./context/theme";
import todoReducer from "./reducers/todoReducer";

function App() {
  // const [todoList, setTodoList] = useState([]);

  // function addTodo(content) {
  //   const todo = {
  //     id: crypto.randomUUID(),
  //     content,
  //     done: false,
  //     edit: false,
  //     selected: false,
  //   };
  //   setTodoList([...todoList, todo]);
  // }

  // function deleteTodo(id) {
  //   setTodoList(todoList.filter((todo) => todo.id !== id));
  // }

  // function toggleTodo(id) {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             done: !todo.done,
  //           }
  //         : todo
  //     )
  //   );
  // }

  // function toggleTodoEdit(id) {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             edit: !todo.edit,
  //           }
  //         : todo
  //     )
  //   );
  // }

  // function editTodo(id, content) {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             edit: false,
  //             content,
  //           }
  //         : todo
  //     )
  //   );
  // }

  // function selectTodo(id) {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             selected: true,
  //           }
  //         : {
  //             ...todo,
  //             selected: false,
  //           }
  //     )
  //   );
  // }

  // const [theme, setTheme] = useState("primary");

  // function handleChange(e) {
  //   setTheme(e.target.value);
  // }

  const [state, dispatch] = useReducer(todoReducer, {
    theme: "primary",
    todoList: [],
  });

  function addTodo(content) {
    dispatch({
      type: "ADD_TODO",
      content,
    });
  }
  function deleteTodo(id) {
    dispatch({
      type: "DELETE_TODO",
      id,
    });
  }
  function toggleTodo(id) {
    dispatch({
      type: "TOGGLE_TODO",
      id,
    });
  }
  function toggleTodoEdit(id) {
    dispatch({
      type: "TOGGLE_EDIT_TODO",
      id,
    });
  }
  function editTodo(id, content) {
    dispatch({
      type: "EDIT_TODO",
      content,
      id,
    });
  }
  function selectTodo(id) {
    dispatch({
      type: "SELECT_TODO",
      id,
    });
  }

  function handleChange(e) {
    dispatch({
      type: "SET_THEME",
      theme: e.target.value,
    });
  }

  return (
    <themeContext.Provider value={state.theme}>
      <div className="d-flex flex-row justify-content-center align-items-center p-20">
        <div className="card container p-20">
          <h1 className="mb-20 d-flex flex-row justify-content-center align-items-center">
            <span className="flex-fill">Todo list</span>
            <select
              name="theme"
              onChange={handleChange}
              value={state.theme}
              className="btn"
            >
              <option value="primary">Rouge</option>
              <option value="secondary">Indigo</option>
            </select>
          </h1>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            toggleTodoEdit={toggleTodoEdit}
            editTodo={editTodo}
            selectTodo={selectTodo}
          />
        </div>
      </div>
    </themeContext.Provider>
  );
}

export default App;
