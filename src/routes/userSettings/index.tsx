import Layout from "@/components/Layout";
import LayoutBody from "@/components/Layout/LayoutBody";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import { FormName } from "@/stores/forms";
import { FieldType } from "@/stores/forms/utilTypes";
import { Card, CardContent } from "@/components/ui/card";
import useFormSchema from "@/components/forms/useFormSchema";
import AppForm from "@/components/forms/Form";
import TextField from "@/components/forms/TextField";
import NumberField from "@/components/forms/NumberField";
import { useAppSelector } from "@/stores";
import Button from "@/components/ui/button";
import useSubmitForm from "@/components/forms/useSubmit";
import { updateUserData } from "@/stores/auth";

const UserSettings = () => {
    const user = useAppSelector((state) => state.auth.user);
    const schema = useFormSchema<{
        /**
         * Passing a generic "T extends FormMappable" allows us to expand T into a type-safe schema for the fn argument
         * e.g: Add a new field to the T and TS will flag the input if it's incorrect or missing
         *      Since validations are fully typed as well we can't missuse them if they expect a specific input type
         */
        fields: {
            firstName: {
                type: FieldType.Text; // test by changing to FieldType.Number
            };
            lastName: {
                type: FieldType.Text;
            };
            age: {
                type: FieldType.Number;
            };
        };
    }>({
        formId: FormName.UpdateUserInfo,
        fields: {
            firstName: {
                value: user?.firstName,
                meta: { label: "First name" },
                validations: {
                    validateRequired: {},
                    validateLength: { min: 2, errorMessage: "Minimum 2 characters required" },
                },
            },
            lastName: {
                value: user?.lastName,
                meta: { label: "Last name" },
                validations: {
                    validateRequired: {},
                    validateLength: { min: 2, errorMessage: "Minimum 2 characters required" },
                },
            },
            age: {
                value: user?.age,
                meta: { label: "Age" },
                validations: {
                    validateRequired: {},
                    validateRange: {
                        min: 18,
                        max: 200,
                        errorMessage: "User cannot be younger than 18 or older than 200",
                    },
                },
            },
        },
    });

    const { loading, onSubmit } = useSubmitForm<typeof schema>({
        formId: schema.formId,
        submit: async ({ fields }, { notify, dispatch }) => {
            // Keep full type information and inject some utility functions that will likely be needed on most forms
            dispatch(
                updateUserData({
                    age: fields.age.value,
                    firstName: fields.firstName.value,
                    lastName: fields.lastName.value,
                })
            );
            notify("User data updated successfully!");
        },
    });

    return (
        <Layout>
            <LayoutHeader title="Settings" />

            <LayoutBody className="px-[20%] pt-[10%]">
                <Card>
                    <AppForm schema={schema} onSubmit={1}>
                        <CardContent className="pt-6 flex flex-col gap-7">
                            <TextField formId={schema.formId} fieldKey="firstName" />
                            <TextField formId={schema.formId} fieldKey="lastName" />
                            <NumberField formId={schema.formId} fieldKey="age" />
                            <Button className="self-end w-[30%]" disabled={loading} onClick={onSubmit}>
                                {loading ? "Loading" : "Submit"}
                            </Button>
                        </CardContent>
                    </AppForm>
                </Card>
            </LayoutBody>
        </Layout>
    );
};

export default UserSettings;
