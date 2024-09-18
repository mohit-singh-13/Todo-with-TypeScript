import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getLocal, saveLocal } from "./utils/features";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getLocal());
  
  const [title, setTitle] = useState<TodoItemType["title"]>("");
  
  useEffect(() => {
    saveLocal(todos);
  }, [todos])
  
  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTask = todos.map((todo) => {
      if (todo.id == id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });

    setTodos(newTask);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo = todos.filter((todo) => todo.id !== id);

    setTodos(newTodo);
  };

  const submitHandler = () => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 10000)),
    };

    setTodos((prev) => [...prev, newTodo]);

    setTitle("");
  };

  const editHandler = (title: string, id: string) => {
    const newTitle = todos.map((todo) => {
      if (todo.id === id) todo.title = title;
      return todo;
    });

    setTodos(newTitle);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"72%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => {
          return (
            <TodoItem
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
              todo={i}
              key={i.id}
              editHandler={editHandler}
            />
          );
        })}
      </Stack>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title.length !== 0) {
            submitHandler();
          }
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ margin: "1rem 0" }}
        onClick={submitHandler}
        disabled={title.length === 0}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;
