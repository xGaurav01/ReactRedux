import { configureStore } from "@reduxjs/toolkit";
import Todoreducer from './todoSlice'

export const store = configureStore({
    reducer:{
        todo:Todoreducer
    }
})