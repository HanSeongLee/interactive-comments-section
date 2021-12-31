import {configureStore} from "@reduxjs/toolkit";
import reducer from "./modules";
import logger from 'redux-logger';
import {createWrapper} from "next-redux-wrapper";

const makeStore = (context) => configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});
