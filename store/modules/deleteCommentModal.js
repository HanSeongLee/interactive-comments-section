import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    open: false,
};

const slice = createSlice({
    name: 'deleteCommentModal',
    initialState,
    reducers: {
        open: (state, action) => {
            state.id = action.payload.id;
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        },
    },
});

export const { open, close } = slice.actions;
export default slice.reducer;
