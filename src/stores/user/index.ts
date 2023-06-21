import { createSlice } from '@reduxjs/toolkit';

import { loginAsyncAction } from './actions';

import { persistReducerUtil } from 'packages/stores/utils';

const initialState = {
    status: 'ide',
};

export const userSlice = createSlice({
    name: 'users',
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

export default persistReducerUtil('users', userSlice.reducer);
