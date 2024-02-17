import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "@/components/Layout";
import LayoutBody from "@/components/Layout/LayoutBody";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import { wrappedRegisterForm } from "@/stores/forms";
import { FieldType } from "@/stores/forms/utilTypes";
import { validateLength } from "@/stores/forms/validations";

const UserSettings = () => {
    const dispatch = useDispatch();
    // const auth = useAppSelector(state => state.auth)

    useEffect(() => {
        // The generic FormMappable expands into concrete types with safety preserved for Field specific props and validations
        // Probably can be expanded a ton more, but it will become harder to maintain
        dispatch(
            wrappedRegisterForm<{
                fields: {
                    firstName: {
                        type: FieldType.Text;
                    };
                    familyName: {
                        type: FieldType.Text;
                    };
                };
            }>({
                schema: {
                    formId: "updateUserSettings",
                    fields: {
                        firstName: {
                            value: "",
                            validations: {
                                validateLength: { min: 3, errorMessage: "Minimum of 3 characters" },
                            },
                        },
                        familyName: {
                            value: "",
                            validations: {
                                validateLength: { min: 6, errorMessage: "Minimum of 6 characters required" },
                            },
                        },
                    },
                },
            })

            // })
        );
    }, [dispatch]);

    return (
        <Layout>
            <LayoutHeader title="Settings" />

            <LayoutBody>
                <div>123</div>
            </LayoutBody>
        </Layout>
    );
};

export default UserSettings;
