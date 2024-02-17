export class ErrorValidation extends Error {}

type ValidateLengthArgs = { min?: number; max?: number; errorMessage: string };
export const validateLength = ({ min, max, errorMessage }: ValidateLengthArgs) => (value: string) => {
    if (min && value.length < min) throw new ErrorValidation(errorMessage);
    if (max && value.length > max) throw new ErrorValidation(errorMessage);
};

export const validateEmail = (errorMessage = "Invalid email") => (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) throw new ErrorValidation(errorMessage);
};

type ValidateRangeArgs = { min?: number; max?: number; errorMessage: string };
export const validateRange = ({ min, max, errorMessage }: ValidateRangeArgs) => (value: number) => {
    if (min && value < min) throw new ErrorValidation(errorMessage);
    if (max && value > max) throw new ErrorValidation(errorMessage);
};

// Not the greatest approach since it requires all validations to be exported always
export const appValidations = {
    validateLength,
    validateEmail,
    validateRange,
};

export async function glueValidation<T>(vMap: ValidationsMap, input: T) {
    for await (const [fnName, fnArgs] of Object.entries(vMap)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let errOrPromise = appValidations[fnName](fnArgs)(input);
        if (errOrPromise instanceof Promise) errOrPromise = await errOrPromise;
    }
}

export type ValidationsMap = { [key in keyof typeof appValidations]?: Parameters<typeof appValidations[key]>[0] };
