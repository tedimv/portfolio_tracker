import { FC, ReactElement, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/stores";
import { registerForm } from "@/stores/forms";
import { FormMappable, FormSchema } from "@/stores/forms/utilTypes";

const AppForm: FC<{ children: ReactElement | ReactElement[]; schema: FormSchema<FormMappable>; onSubmit: unknown }> = ({
    children,
    schema,
}) => {
    const dispatch = useDispatch();
    const formState = useAppSelector((state) => state.forms[schema.formId]);

    const hasLoaded = useRef(false);
    useEffect(() => {
        if (hasLoaded.current) return;
        hasLoaded.current = true;
        dispatch(registerForm({ schema }));
    }, [dispatch, schema]);

    if (!formState) return null;

    return children;
};

export default AppForm;
