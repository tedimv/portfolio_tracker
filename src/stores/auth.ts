import { FAKER } from "@/constants/faker";
import { createSlice } from "@reduxjs/toolkit";

type Auth = {
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
});

export const { updateUserData } = authSlice.actions;
