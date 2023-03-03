import {legacy_createStore as createStore} from  "@reduxjs/toolkit";
import {UserReducer} from "../reducers/UserReducer";

export const AppStore=
    createStore(UserReducer)