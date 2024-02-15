import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { themeSlice } from "./theme";
import { investmentsSlice } from "./investments";

export const store = configureStore({
    reducer: combineSlices({ theme: themeSlice.reducer, investments: investmentsSlice.reducer }),
});

type StoreState = ReturnType<typeof store.getState>;

export const useAppSelector = <TValue>(selector: (state: StoreState) => TValue): TValue => {
    return useSelector<StoreState, TValue>(selector);
};
