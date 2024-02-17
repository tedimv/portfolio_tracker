import { useDispatch } from "react-redux";

import { useAppSelector } from "@/stores";
import { updateFieldError, updateFieldValue } from "@/stores/forms";
import { ErrorValidation, glueValidation } from "@/stores/forms/validations";
import { FormField, MetaText } from "@/stores/forms/utilTypes";
import { Input } from "@/components/ui/input";

type FieldProps = {
    formId?: string;
    fieldKey: string;
};

function TextField({ formId = "", fieldKey }: FieldProps) {
    const dispatch = useDispatch();
    const { value = "", validations, error, meta } = useAppSelector(
        (state) => state.forms[formId].fields[fieldKey] as FormField<string, MetaText>
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
            await glueValidation<string>(validations, e.target.value);
            if (error)
                dispatch(
                    updateFieldError({
                        form: formId,
                        field: fieldKey,
                        error: null,
                    })
                );
        } catch (err) {
            if (err instanceof ErrorValidation) {
                dispatch(
                    updateFieldError({
                        form: formId,
                        field: fieldKey,
                        error: err.message,
                    })
                );
            }
        }
    }

    return (
        <div className="flex flex-col gap-1">
            {meta?.label && (
                <p className="p-0 m-0">
                    {meta?.label}
                    {validations["validateRequired"] && <span className='text-red-600'>*</span>}
                </p>
            )}
            <Input type="text" value={value} onChange={handleUpdateAndValidate} />
            {error && <div className="font-light text-red-600">{error}</div>}
        </div>
    );
}

export default TextField;
