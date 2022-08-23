// import { createStore, applyMiddleware } from "redux";
// import { delayActionMiddleware } from "./middleware";
const { createStore, applyMiddleware } = require("redux");
const { delayActionMiddleware, fetchTodoMiddleware } = require("./middleware")



// initial State
const initialState = {
    todos : []
}

// reducer
const todoReducer = (state=initialState,action) => {
  switch (action.type) {
    case "todos/todoAdded":
        return {
           ...state ,
           todos :[
            ...state.todos,
            {
                title : action.payload,
            }
           ]
        }

    case "todos/todoLoaded" :
        return {
            ...state ,
            todos : [
                ...state.todos,
                ...action.payload
            ]
        }    
          
    default:
        break;
  }
}


// store
const store = createStore(
    todoReducer,
    applyMiddleware(delayActionMiddleware,fetchTodoMiddleware)
)

// subscribe to state changes
store.subscribe(()=>{
    console.log(store.getState());
})


// actions dispatch

// store.dispatch({
//     type : "todos/todoAdded",
//     payload : "Learn Redux from Youtube"
// })
store.dispatch({
    type : "todos/fetchTodos",
})







