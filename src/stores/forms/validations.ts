export class ErrorValidation extends Error {}

type ValidateLengthArgs = { min?: number; max?: number; errorMessage: string };
export const validateLength = ({ min, max, errorMessage }: ValidateLengthArgs) => (value: string) => {
    if (min && value.length < min) throw new ErrorValidation(errorMessage);
    if (max && value.length > max) throw new ErrorValidation(errorMessage);
};

type ValidateEmailArgs = { errorMessage?: string };
export const validateEmail = ({ errorMessage = "Invalid email" }: ValidateEmailArgs) => (value: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(value)) throw new ErrorValidation(errorMessage);
};

type ValidateRangeArgs = { min?: number; max?: number; errorMessage: string };
export const validateRange = ({ min, max, errorMessage }: ValidateRangeArgs) => (value: number) => {
    if (min && value < min) throw new ErrorValidation(errorMessage);
    if (max && value > max) throw new ErrorValidation(errorMessage);
};

type ValidateRequiredArgs = { errorMessage?: string };
export const validateRequired = ({ errorMessage = "Field is required" }: ValidateRequiredArgs) => (value: unknown) => {
    if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.length === 0) ||
        (Array.isArray(value) && value.length === 0)
    )
        throw new ErrorValidation(errorMessage);
};

// Not the greatest approach since it requires all validations to be exported always
export const appValidations = {
    validateLength,
    validateEmail,
    validateRange,
    validateRequired,
};

export async function glueValidations<TValue>(vMap: ValidationsMap<TValue>, value: TValue) {
    for await (const [fnName, fnArgs] of Object.entries(vMap)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let errOrPromise = appValidations[fnName](fnArgs)(value);
        if (errOrPromise instanceof Promise) errOrPromise = await errOrPromise;
    }
}

export type ValidationsMap<TValue = unknown> = {
    [key in keyof typeof appValidations]?: TValue extends Parameters<ReturnType<typeof appValidations[key]>>[0]
        ? Parameters<typeof appValidations[key]>[0]
        : never;
};
