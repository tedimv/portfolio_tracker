import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
    },
    reducers: {
        incremented: (state) => {
            state.count += 1;
        },
        decremented: (state) => {
            state.count -= 1;
        },
    },
});

export const { incremented, decremented } = counterSlice.actions;

export const store = configureStore({
    reducer: counterSlice.reducer,
});

type StoreState = ReturnType<typeof store.getState>;

export const useAppSelector = <TValue>(selector: (state: StoreState) => TValue): TValue => {
    return useSelector<StoreState, TValue>(selector);
};
