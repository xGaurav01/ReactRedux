const { createSlice } = require("@reduxjs/toolkit");


const TodoSlice = createSlice({
    name:'todoSlice',
    initialState:{
        todos:{}
    },
    reducers:{
        add:(state,action)=>{
            let todo = action.payload
            state.todos[todo.id] = todo
        },
        remove: (state,action)=>{
            let todoId = action.payload;
            delete state.todos[todoId]
        },
        update:(state,action) => {
            let todo = action.payload;
            state.todos[todo.id] = todo;
        }
        
    }
})
export const { add, remove ,update} = TodoSlice.actions;
export default TodoSlice.reducer;