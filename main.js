let todos = [
  { text: "groceries", done: false },
  { text: "gardening", done: true },
  { text: "taxes", done: false }
];

const mainElement = document.getElementById("main");
const inputElement = document.getElementById("new-todo");
const formElement = document.getElementById("new-todo-form");
const deleteCompletedBtn = document.getElementById("delete-completed-btn");
const notificationBtn = document.getElementById("notify-btn");

const renderTodos = () => {
  mainElement.innerHTML = "";
  for (let [index, todo] of todos.entries()) {
    const todoElement = document.createElement("div");
    const prefix = todo.done ? "DONE: " : "TODO: ";
    todoElement.innerHTML = prefix + todo.text;
    todoElement.classList.add("todo");
    if (todo.done) {
      todoElement.classList.add("done");
    }
    todoElement.addEventListener("click", () => {
      toggleTodo(index);
    });
    mainElement.appendChild(todoElement);
  }
};

const toggleTodo = todoIndex => {
  todos[todoIndex].done = !todos[todoIndex].done;
  storeTodos();
  renderTodos();
};

const handleSubmit = submitEvent => {
  submitEvent.preventDefault();
  const newTodoText = inputElement.value;
  inputElement.value = "";
  todos.push({ text: newTodoText, done: false });
  storeTodos();
  renderTodos();
  showAddNotification(newTodoText);
};
formElement.addEventListener("submit", handleSubmit);

const deleteCompleted = () => {
  todos = todos.filter(todo => !todo.done);
  storeTodos();
  renderTodos();
};
deleteCompletedBtn.addEventListener("click", deleteCompleted);

const storeTodos = () => {
  const todoString = JSON.stringify(todos);
  localStorage.setItem("todos", todoString);
};

const loadTodos = () => {
  const todoString = localStorage.getItem("todos") || "[]";
  todos = JSON.parse(todoString);
};

loadTodos();
renderTodos();

Notification.requestPermission(status => {});

const showAddNotification = newTodoText => {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(registration => {
      registration.showNotification("New Todo added", {
        body: `New Todo: ${newTodoText}`,
        icon: "/images/icon-144.png",
        vibrate: [100, 50, 100]
      });
    });
  }
};

navigator.serviceWorker.register("./service-worker.js");
