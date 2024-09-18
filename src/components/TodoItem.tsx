import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete, Done } from "@mui/icons-material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  completeHandler: (id: TodoItemType["id"]) => void;
  deleteHandler: (id: TodoItemType["id"]) => void;
  editHandler: (title: string, id: string) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            sx={{
              marginRight: "auto",
            }}
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                editHandler(textVal, todo.id);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          onChange={() => completeHandler(todo.id)}
          checked={todo.isCompleted}
        />
        <Button
          onClick={() => {
            if (!editActive) setEditActive((prev) => !prev);
            else {
              editHandler(textVal, todo.id);
              setEditActive(false);
            }
          }}
        >
          {editActive ? <Done /> : <Edit />}
        </Button>
        <Button onClick={() => deleteHandler(todo.id)}>
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
