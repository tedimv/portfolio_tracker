import { useDispatch } from "react-redux";

import { useAppSelector } from "@/stores";
import { updateFieldError, updateFieldValue } from "@/stores/forms";
import { ErrorValidation, glueValidation } from "@/stores/forms/validations";
import { FormField } from "@/stores/forms/utilTypes";

type FieldProps = {
    formId: string;
    fieldKey: string;
};

function TextField({ formId, fieldKey }: FieldProps) {
    const dispatch = useDispatch();
    const { value = "", validations, error } = useAppSelector(
        (state) => state.forms[formId].fields[fieldKey] as FormField<string>
    );

    async function handleUpdateAndValidate(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            updateFieldValue({
                form: formId,
                field: fieldKey,
                value: e.target.value,
            })
        );

        try {
            await glueValidation(validations, e.target.value);
        } catch (err) {
            if (err instanceof ErrorValidation) {
                dispatch(
                    updateFieldError({
                        form: formId,
                        field: fieldKey,
                        error: err,
                    })
                );
            }
        }
    }

    return (
        <div>
            <input type="text" value={value} onChange={handleUpdateAndValidate} />
            {error && <div>{error.message}</div>}
        </div>
    );
}

export default TextField;
