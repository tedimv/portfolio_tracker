import { FAKER } from "@/constants/faker";
import { createSlice } from "@reduxjs/toolkit";
import { putUpdateUserInfo } from "./thunks";

export type Auth = {
    loading: boolean;
    user: {
        firstName: string;
        lastName: string;
        age: number;
    } | null;
};

type ActionUpdateUserData = {
    payload: Auth["user"];
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: {
            firstName: FAKER.person.firstName(),
            lastName: FAKER.person.lastName(),
            age: FAKER.number.int({ min: 20, max: 50 }),
        },
    } as Auth,
    reducers: {
        updateUserData: (state, action: ActionUpdateUserData) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(putUpdateUserInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(putUpdateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(putUpdateUserInfo.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { updateUserData } = authSlice.actions;
