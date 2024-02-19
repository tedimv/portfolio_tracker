import { StoreAssetGroup, initState } from "../investments";
import { WalletAsset } from "../investments/dtos/base";
import { ValidationsMap } from "./validations";

export type FormId = string;
export type FieldKey = string;

export type StoreFormsState = Record<FormId, FormSchema<FormMappable>>;

export type FormField<TValue = unknown, TMeta = unknown, TFieldComplete = false> = (TFieldComplete extends true
    ? { value: TValue }
    : { value?: TValue }) & {
    error?: string | null;
    meta?: TMeta; // things like "label","isMultiselect", etc
    /***
     * All validations are curried.
     * Because functions are not serializable we keep
     * JSON data in redux and deserialize it in each Field
     * @throws ErrorValidation
     */
    validations: Partial<ValidationsMap<TValue>>;
};

export type MetaText = { label?: string; format?: string };
export type MetaSelect = { label?: string; isMultiselect?: boolean };
export type MetaNumber = { label?: string; float?: { precison: number } };

export enum FieldType {
    Text = "Text",
    Number = "Number",
    Select = "Select",
}

export type FormMappableField<T = unknown> = { type: FieldType; shape?: T };
export type FormMappable = { fields: Record<string, FormMappableField> };
export type FormSchema<T extends FormMappable, TFormComplete = false> = {
    formId: string;
    fields: {
        [key in keyof T["fields"]]: T["fields"][key]["type"] extends FieldType.Text
            ? FormField<string, MetaText, TFormComplete>
            : T["fields"][key]["type"] extends FieldType.Number
            ? FormField<number, MetaNumber, TFormComplete>
            : T["fields"][key]["type"] extends FieldType.Select
            ? FormField<Array<T["fields"][key]["shape"]>, MetaSelect, TFormComplete>
            : FormField<unknown, unknown, TFormComplete>;
    };
};

export type ExtractSchema<T> = T extends FormSchema<infer TSchema> ? TSchema : never;

// #interesting
export type KeyofStoreAssets = keyof typeof initState;
export type AssetPredicate<TAssetType extends keyof typeof initState> = (
    asset: typeof initState[TAssetType] extends StoreAssetGroup<unknown, infer TWalletDto> ? TWalletDto : WalletAsset
) => boolean;
