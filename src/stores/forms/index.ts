import { createSlice } from "@reduxjs/toolkit";

import { FieldKey, FormId, FormMappable, FormSchema, StoreFormsState } from "./utilTypes";

type ActionRegisterForm<T extends FormMappable> = {
    payload: {
        schema: FormSchema<T>;
    };
};

type ActionUpdateFieldError = {
    payload: {
        form: FormId;
        field: FieldKey;
        error: string | null;
    };
};

type ActionUpdateFieldValue = {
    payload: {
        form: FormId;
        field: FieldKey;
        value: unknown;
    };
};

export const formsSlice = createSlice({
    name: "forms",
    initialState: {} as StoreFormsState,
    reducers: {
        registerForm: function <T extends FormMappable>(state: StoreFormsState, action: ActionRegisterForm<T>) {
            const { schema } = action.payload;
            console.log({ schema });

            state[schema.formId] = schema as FormSchema<FormMappable>;
        },
        updateFieldValue: (state, action: ActionUpdateFieldValue) => {
            const { form, field, value } = action.payload;
            state[form].fields[field].value = value;
        },
        updateFieldError: (state, action: ActionUpdateFieldError) => {
            const { form, field, error } = action.payload;
            console.log("NEW ERROR ", error);
            state[form].fields[field].error = error;
        },
    },
});

export const { registerForm, updateFieldValue, updateFieldError } = formsSlice.actions;

export function useFormSchema<T extends FormMappable>(action: ActionRegisterForm<T>["payload"]) {
    // The generics narrow down the types but when we pass them
    // to the actions they expect "unknown" generic values so we need to de-de-mystify the types
    return registerForm(action as { schema: FormSchema<FormMappable> });
}

export enum FormName {
    UpdateUserInfo = "UpdateUserInfo",
}
