export declare class CustomError extends Error {
    readonly message: string;
    readonly code?: string | undefined;
    readonly details?: any;
    constructor(message: string, code?: string | undefined, details?: any);
}
