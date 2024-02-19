import AppForm from "@/components/forms/Form";
import useSubmitForm from "@/components/forms/useSubmit";
import { Dialog, DialogHeader, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { FormName } from "@/stores/forms";
import useFormSchema from "@/components/forms/useFormSchema";
import { AssetPredicate, FieldType, KeyofStoreAssets } from "@/stores/forms/utilTypes";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import NumberField from "@/components/forms/NumberField";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { store } from "@/stores";
import { thunkBuyAsset } from "@/stores/investments/thunks";

type ModalBuyAssetProps<TAssetType extends KeyofStoreAssets> = {
    assetType: TAssetType;
    findAssetPredicate: AssetPredicate<TAssetType>;
    onClose: () => void;
    assetName: string;
};
function ModalBuyAsset<TAssetType extends KeyofStoreAssets>({
    assetType,
    findAssetPredicate,
    onClose,
    assetName,
}: ModalBuyAssetProps<TAssetType>) {
    const schema = useFormSchema<{
        fields: {
            amount: {
                type: FieldType.Number;
            };
        };
    }>({
        formId: FormName.BuyAsset,
        fields: {
            amount: {
                value: 1,
                meta: {
                    label: "Amount",
                    float: { precison: 3 },
                },
                validations: {
                    validateRange: { min: 0.005, errorMessage: "Min purchasable amount is 0.005" },
                },
            },
        },
    });

    const { loading, onSubmit } = useSubmitForm<typeof schema>({
        formId: schema.formId,
        submit: async ({ fields }, { notify }) => {
            await store.dispatch(
                thunkBuyAsset({
                    payload: {
                        amount: fields.amount.value,
                        assetType,
                        predicate: findAssetPredicate,
                    },
                })
            );
            notify.success("Transaction successful!");
            onClose();
        },
    });

    return (
        <Dialog open modal onOpenChange={onClose}>
            <DialogPortal>
                <DialogContent className="absolute h-full w-full top-0 left-0 flex justify-center items-center bg-red z-20  ">
                    <Card className="p-4 flex flex-col">
                        <DialogHeader className="mb-2">
                            <DialogTitle>
                                Buy asset: <b>{assetName}</b>
                            </DialogTitle>
                        </DialogHeader>

                        <AppForm schema={schema} onSubmit={onSubmit}>
                            <div className="flex flex-col gap-3">
                                <NumberField formId={schema.formId} fieldKey="amount" />
                                <div className="w-full flex flex-row gap-3">
                                    <Button
                                        disabled={loading}
                                        variant="destructive"
                                        onClick={() => !loading && onClose()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} onClick={onSubmit}>
                                        {loading ? "Loading..." : "Submit"}
                                    </Button>
                                </div>
                            </div>
                        </AppForm>
                    </Card>
                </DialogContent>
                <DialogOverlay className="z-10" onClick={() => !loading && onClose()} />
            </DialogPortal>
        </Dialog>
    );
}

export default ModalBuyAsset;
