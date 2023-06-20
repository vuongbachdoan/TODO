export const sortTodos = (todos) => {
  return todos.sort((item1, item2) => (item1.completed === false) - (item2.completed === false)).reverse();
};
