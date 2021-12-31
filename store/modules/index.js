import {combineReducers} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import deleteCommentModal from "./deleteCommentModal";

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return combineReducers({
        deleteCommentModal,
    })(state, action);
};

export default reducer;
