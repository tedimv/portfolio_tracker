import { FC, ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/stores";
import { registerForm } from "@/stores/forms";
import { FormMappable, FormSchema } from "@/stores/forms/utilTypes";

const AppForm: FC<{ children: ReactElement | ReactElement[]; schema: FormSchema<FormMappable> }> = ({
    children,
    schema,
}) => {
    const dispatch = useDispatch();
    const formState = useAppSelector((state) => state.forms[schema.formId]);

    useEffect(() => {
        dispatch(registerForm({ schema }));
    }, [dispatch, schema]);

    if (!formState) return null;

    return children;
};

export default AppForm;
