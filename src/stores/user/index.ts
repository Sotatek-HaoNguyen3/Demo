import { createSlice } from '@reduxjs/toolkit';

import { loginAsyncAction } from './actions';

const initialState = {
    status: 'ide',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAsyncAction.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginAsyncAction.fulfilled, (state, payload) => {
            state.status = 'ide';
        })
        .addCase(loginAsyncAction.rejected, (state) => {
            state.status = 'ide';
        })
    },
});

export default userSlice.reducer;
