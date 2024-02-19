import { useDispatch } from "react-redux";

import { useAppSelector } from "@/stores";
import { updateFieldError, updateFieldValue } from "@/stores/forms";
import { ErrorValidation, glueValidations } from "@/stores/forms/validations";
import { FormField, MetaNumber } from "@/stores/forms/utilTypes";
import { Input } from "@/components/ui/input";

type FieldProps = {
    formId?: string;
    fieldKey: string;
};

function NumberField({ formId = "", fieldKey }: FieldProps) {
    const dispatch = useDispatch();
    const { value, validations, error, meta } = useAppSelector(
        (state) => state.forms[formId].fields[fieldKey] as FormField<number, MetaNumber>
    );

    async function handleUpdateAndValidate(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        const sanitizedNegative = val.includes("-") ? "-" + val.replace(/-/g, "") : val;

        // This is a very messy solution and should have some tests since there are many little gotchas that are not inherintly obvious
        // let sanitizedFloat = sanitizedNegative.replace(/\./g, "");
        const segments = sanitizedNegative.split(".");
        let sanitizedFloat = segments[0];
        if (meta?.float) {
            sanitizedFloat += segments[1] ? `.${segments[1].slice(0, meta.float.precison)}` : "";
        }

        dispatch(
            updateFieldValue({
                form: formId,
                field: fieldKey,
                value: Number(sanitizedFloat),
            })
        );

        try {
            await glueValidations<number>(validations, Number(e.target.value));
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

    // This is a very messy solution and should have some tests since there are many little gotchas that are not inherintly obvious
    return (
        <div className="flex flex-col gap-1">
            {meta?.label && (
                <p className="p-0 m-0">
                    {meta?.label}
                    {validations["validateRequired"] && <span className="text-red-600">*</span>}
                </p>
            )}
            <Input type="number" value={value} onChange={handleUpdateAndValidate} />
            {error && <div className="font-light text-red-600">{error}</div>}
        </div>
    );
}

export default NumberField;
