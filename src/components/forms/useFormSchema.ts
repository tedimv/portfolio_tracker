import { useMemo } from "react";

import { FormMappable, FormSchema } from "@/stores/forms/utilTypes";

function useFormSchema<T extends FormMappable>(schema: FormSchema<T>) {
    // The generics narrow down the types but when we pass them
    // to the actions they expect "unknown" generic values so we need to re-mystify the types
    const _schema = useMemo(() => schema, [schema]);
    return _schema;
}

export default useFormSchema;
