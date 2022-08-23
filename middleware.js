const { default: fetch } = require("node-fetch");

const delayActionMiddleware = (store) => (next) => (action) => {
  if (action.type === "todos/todoAdded") {
    console.log("I am delaying You!");
    setTimeout(() => {
      next(action);
    }, 3000);

    return;
  }

  return next(action);
};

const fetchTodoMiddleware = (store) => (next) => async (action) => {
  if (action.type === "todos/fetchTodos") {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    const todos = await response.json()

    store.dispatch({
        type : "todos/todoLoaded",
        payload : todos,
    })
    return;
}
return next(action)
};

module.exports = {
  delayActionMiddleware,
  fetchTodoMiddleware
};
