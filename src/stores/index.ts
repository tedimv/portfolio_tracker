import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { themeSlice } from "./theme";
import { investmentsSlice } from "./investments";
import { formsSlice } from "./forms";
import { authSlice } from "./auth";

export const store = configureStore({
    reducer: combineSlices({
        theme: themeSlice.reducer,
        investments: investmentsSlice.reducer,
        forms: formsSlice.reducer,
        auth: authSlice.reducer,
    }),
});

export type StoreState = ReturnType<typeof store.getState>;

export const useAppSelector = <TValue>(selector: (state: StoreState) => TValue): TValue => {
    return useSelector<StoreState, TValue>(selector);
};
