const loginForm = document.querySelector(".login");
const loginInput = loginForm.querySelector("input");
const welcome = document.querySelector(".welcome");
const existingUsers = JSON.parse(localStorage.getItem("users"));
let users = existingUsers ? existingUsers : [];
let user;
const initialTodoArray = (user) => {
  const initialArray = [
    {
      user,
      value: `❕ To mark as done, click on the todo item.`,
      todoID: `${Date.now()}0`,
    },
    {
      user,
      value: `❕ To delete a todo item, enable edit mode and click on the todo item.`,
      todoID: `${Date.now()}1`,
    },
    {
      user,
      value: `❕ To edit the content of a todo item, enable edit mode and right click on the todo item. To save the changes, right click once more.`,
      todoID: `${Date.now()}2`,
    },
  ];
  return initialArray;
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = loginInput.value;
  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem("users", JSON.stringify(users));
    todos.push(...initialTodoArray(username));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  refreshTodos();
  const userTodos = todos.filter((todoObj) => todoObj.user === username);
  userTodos.forEach((todoObj) => {
    paintTodos(todoObj.value, todoObj.todoID);
  });
  initTodos();
  user = username;
  loginForm.classList.add("hidden");
  main.classList.remove("hidden");
  welcome.innerText = `Hello ${username}`;
};

loginForm.addEventListener("submit", handleLogin);
