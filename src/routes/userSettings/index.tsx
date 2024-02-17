import Layout from "@/components/Layout";
import LayoutBody from "@/components/Layout/LayoutBody";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import { FormName } from "@/stores/forms";
import { FieldType } from "@/stores/forms/utilTypes";
import { Card, CardContent } from "@/components/ui/card";
import useFormSchema from "@/components/forms/useFormSchema";
import AppForm from "@/components/forms/Form";
import TextField from "@/components/forms/TextField";

const UserSettings = () => {
    // const auth = useAppSelector((state) => state);
    const schema = useFormSchema<{
        /**
         * Passing a generic "T extends FormMappable" allows us to expand T into a type-safe schema type for the fn argument
         * e.g: Add a new field to the T and TS will flag the input if it's incorrect or missing
         *      Since validations are fully typed as well we can't missuse them if they expect a specific input type
         */
        fields: {
            firstName: {
                type: FieldType.Text; // change to FieldType.Number
            };
            lastName: {
                type: FieldType.Text;
            };
            email: {
                type: FieldType.Text;
            };
        };
    }>({
        formId: FormName.UpdateUserInfo,
        fields: {
            firstName: {
                value: "",
                meta: { label: "First name" },
                validations: {
                    validateRequired: {},
                    validateLength: { min: 2, errorMessage: "Minimum 2 characters required" },
                },
            },
            lastName: {
                value: "",
                meta: { label: "Last name" },
                validations: {
                    validateRequired: {},
                    validateEmail: {},
                    validateLength: { min: 2, errorMessage: "Minimum 2 characters required" },
                },
            },
            email: {
                meta: { label: "Email" },
                validations: {
                    validateRequired: {},
                    validateEmail: {},
                },
            },
        },
    });

    console.log(schema);

    return (
        <Layout>
            <LayoutHeader title="Settings" />

            <LayoutBody>
                <Card>
                    <CardContent>
                        <AppForm schema={schema}>
                            <TextField formId={schema.formId} fieldKey="firstName" />
                            {/* <TextField formId={schema.formId} fieldKey="lastName" /> */}
                        </AppForm>
                        {/* <TextField formId={FormName.UpdateUserInfo} fieldKey="firstName" />
                        <TextField formId={FormName.UpdateUserInfo} fieldKey="lastName" />
                        <TextField formId={FormName.UpdateUserInfo} fieldKey="email" /> */}
                    </CardContent>
                </Card>
            </LayoutBody>
        </Layout>
    );
};

export default UserSettings;
