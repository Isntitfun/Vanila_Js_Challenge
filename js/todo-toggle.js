const todoForm = document.querySelector(".todoForm");
const todo = document.querySelector(".todo");
const todoBtn = document.querySelector(".todoBtn");
const todoClose = document.querySelector(".todoClose");
const todoClose2 = document.querySelector(".todoClose2");
const todoOpen = document.querySelector(".todoOpen");

const todoBox = document.querySelector(".todoBox");
const todoAdd = document.querySelector(".todoAdd");
const todoEdit = document.querySelector(".todoEdit");

const todoFormListenerAdder = () => {
  todoForm.addEventListener("click", handleTodoActive);
};
const todoBoxListenerAdder = () => {
  todoBox.addEventListener("click", handleTodoBoxActive);
};

const handleTodoActive = () => {
  todoForm.classList.remove("todoInactive");
  todo.classList.add("todoActive");
  todoBtn.classList.add("todoActive");
  todoClose.classList.add("todoActive");
  todoOpen.classList.add("todoActive");
  todoForm.removeEventListener("click", handleTodoActive);
};

const handleTodoDeactive = () => {
  todoForm.classList.add("todoInactive");
  todo.classList.remove("todoActive");
  todoBtn.classList.remove("todoActive");
  todoClose.classList.remove("todoActive");
  todoOpen.classList.remove("todoActive");
  setTimeout(todoFormListenerAdder, 100);
};

const handleTodoBoxActive = () => {
  todoBox.classList.remove("todoBoxInactive");
  todoClose2.classList.add("todoActive");
  todoAdd.classList.add("todoActive");
  todoEdit.classList.add("todoActive");
  todoList.classList.add("todoListActive");
  todoBox.removeEventListener("click", handleTodoBoxActive);
};

const handleTodoBoxDeactive = () => {
  todoBox.classList.add("todoBoxInactive");
  todoClose2.classList.remove("todoActive");
  todoAdd.classList.remove("todoActive");
  todoEdit.classList.remove("todoActive");
  todoList.classList.remove("todoListActive");
  setTimeout(todoBoxListenerAdder, 100);
};

const handleTodoListToggle = () => {
  todoBox.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
};

todoBtn.addEventListener("click", handleTodoSubmit);
todoForm.addEventListener("click", handleTodoActive);
todoClose.addEventListener("click", handleTodoDeactive);
todoOpen.addEventListener("click", handleTodoListToggle);
todoAdd.addEventListener("click", handleTodoListToggle);

todoClose2.addEventListener("click", handleTodoBoxDeactive);
