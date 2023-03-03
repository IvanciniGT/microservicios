import {configureStore, createStore} from "@reduxjs/toolkit";
import {UserReducer} from "../reducers/UserReducer";

export const AppStore=
    createStore(UserReducer)