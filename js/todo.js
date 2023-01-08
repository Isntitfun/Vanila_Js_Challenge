let todoText = document.querySelectorAll(".todoText");
let todoTextEditMode = false;
let todoTextEdit = [];
const existingTodos = JSON.parse(localStorage.getItem("todos"));
let todos = existingTodos ? existingTodos : [];
const todoList = document.querySelector(".todoList");
const todoEditBtn = document.querySelector(".todoEdit");

const refreshTodos = () => {
  const existingTodos = JSON.parse(localStorage.getItem("todos"));
  todos = existingTodos ? existingTodos : [];
};

const adjustHeight = (todo) => {
  todo.style.height = todo.scrollHeight + "px";
};

const initTodos = () => {
  todoText.forEach((i) => {
    i.removeEventListener("click", handleTodoChecked);
  });
  todoText = document.querySelectorAll(".todoText");
  todoText.forEach((i) => {
    i.addEventListener("click", handleTodoChecked);
  });
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const paintTodos = (todo, id) => {
  const newTodo = document.createElement("textarea");
  newTodo.classList.add("todoText");
  newTodo.classList.add("todoActive");
  newTodo.setAttribute("readonly", "");
  newTodo.setAttribute("data-id", id);
  newTodo.innerText = todo;
  todoList.appendChild(newTodo);
  adjustHeight(newTodo);
};

const handleTodoSubmit = (event) => {
  event.preventDefault();
  const baseID = Date.now();
  let newTodos = todo.value.split(/\r?\n/);
  newTodos = newTodos.filter((i) => i !== "");
  newTodos.forEach((todo) => {
    const todoID = `${baseID}${newTodos.indexOf(todo)}`;
    const newTodoObj = {
      user,
      value: todo,
      todoID,
    };
    todos.push(newTodoObj);
    paintTodos(todo, todoID);
  });
  saveTodos();
  todo.value = "";
  initTodos();
  if (todoTextEditMode) {
    handleTodoEdit();
    handleTodoEdit();
  }
  handleTodoListToggle();
};

const handleTodoChecked = (event) => {
  event.target.classList.toggle("checkedTodo");
};

const removeTodos = (event) => {
  if (todoTextEditMode) {
    const target = event.target;
    const id = target.dataset.id;
    todoList.removeChild(target);
    refreshTodos();
    todos = todos.filter((todoObj) => todoObj.todoID != id);
    saveTodos();
  }
};

const editTodos = (event) => {
  event.preventDefault();
  const target = event.currentTarget;
  const readonly = target.getAttribute("readonly") === "";

  if (todoTextEditMode) {
    if (readonly) {
      target.removeAttribute("readonly");
      target.focus();
      target.classList.add("editingTodo");
      target.classList.remove("todoTextEdit");
      target.removeEventListener("click", removeTodos);
      target.removeEventListener("click", handleTodoChecked);
    } else {
      let editedTodo = todos.find((todo) => todo.todoID == target.dataset.id);
      editedTodo.value = target.value;
      const index = todos.indexOf(editedTodo);
      todos.splice(index, 1, editedTodo);
      saveTodos();
      adjustHeight(target);
      target.setAttribute("readonly", "");
      target.classList.remove("editingTodo");
      target.classList.add("todoTextEdit");
      target.addEventListener("click", removeTodos);
      target.addEventListener("click", handleTodoChecked);
    }
  }
};

const handleTodoEdit = () => {
  todoTextEditMode = !todoTextEditMode;

  if (todoTextEditMode) {
    todoBox.classList.add("editModeOn");
    todoEditBtn.classList.add("todoEditActive");
    todoText.forEach((todo) => {
      todo.classList.add("todoTextEdit");
    });
    todoTextEdit = document.querySelectorAll(".todoTextEdit");
    todoTextEdit.forEach((i) => {
      i.addEventListener("click", removeTodos);
    });
    todoTextEdit.forEach((i) => {
      i.addEventListener("contextmenu", editTodos);
    });
  } else {
    todoBox.classList.remove("editModeOn");
    todoEditBtn.classList.remove("todoEditActive");
    todoText.forEach((todo) => {
      todo.classList.remove("todoTextEdit");
      if (todo.getAttribute("readonly") !== "") {
        let editedTodo = todos.find((i) => i.todoID == todo.dataset.id);
        editedTodo.value = todo.value;
        const index = todos.indexOf(editedTodo);
        todos.splice(index, 1, editedTodo);
        saveTodos();
        adjustHeight(todo);
        todo.setAttribute("readonly", "");
        todo.classList.remove("editingTodo");
        todo.addEventListener("click", handleTodoChecked);
      }
    });
    todoTextEdit.forEach((i) => {
      i.removeEventListener("click", removeTodos);
    });
    todoTextEdit.forEach((i) => {
      i.removeEventListener("contextmenu", editTodos);
    });
    todoTextEdit = [];
  }
};

todoText.forEach((i) => {
  i.addEventListener("click", handleTodoChecked);
});

todoEditBtn.addEventListener("click", handleTodoEdit);
