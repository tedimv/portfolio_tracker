import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";

import { useAppSelector } from "@/stores";
import { updateFieldError } from "@/stores/forms";
import { ExtractSchema, FormId, FormMappable, FormSchema } from "@/stores/forms/utilTypes";
import { ErrorValidation, glueValidations } from "@/stores/forms/validations";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "sonner";

type InjectedUtils = { dispatch: Dispatch; navigator: NavigateFunction; notify: typeof toast };
export type ReValidateFormArgs<T extends FormMappable> = {
    formId: FormId;
    // #interesting - specifically how "true" affects this generic's usage in onSubmit
    submit(schema: FormSchema<T, true>, utils: InjectedUtils): Promise<void>;
};

function useSubmitForm<T extends FormSchema<FormMappable>>({ formId, submit }: ReValidateFormArgs<ExtractSchema<T>>) {
    const formSchema = useAppSelector((state) => state.forms[formId]);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = useCallback(async () => {
        setLoading(true);

        let hasErrors = false;
        for await (const [fieldKey, fieldSchema] of Object.entries(formSchema.fields)) {
            try {
                await glueValidations(fieldSchema.validations ?? {}, fieldSchema.value);
            } catch (error) {
                if (error instanceof ErrorValidation) {
                    dispatch(
                        updateFieldError({
                            form: formId,
                            field: fieldKey,
                            error: error.message,
                        })
                    );
                }

                hasErrors = true;
            }
        }

        try {
            if (hasErrors) throw new ErrorValidation("Please check all form fields and submit again");
            // Simulate delay
            await new Promise((res) => {
                setTimeout(res, 1500);
            });
            await submit(formSchema as FormSchema<ExtractSchema<T>, true>, { navigator, dispatch, notify: toast });
        } catch (error) {
            if (error instanceof ErrorValidation) toast.error(error.message);
            else {
                console.error(error);
                toast.error("Something went wrong. Contact your admin.");
            }
        }

        setLoading(false);
    }, [dispatch, formId, formSchema, navigator, submit]);

    return { loading, onSubmit: handleOnSubmit };
}

export default useSubmitForm;
