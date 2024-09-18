export const saveLocal = (todos: TodoItemType[]): void => {
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

export const getLocal = (): TodoItemType[] => {
    const todos = localStorage.getItem("myTodos");
    return todos ? JSON.parse(todos) : []
}