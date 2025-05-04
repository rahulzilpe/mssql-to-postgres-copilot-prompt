import { CustomError } from './custom-error';
/**
 * Handles errors during conversion
 */
export declare function handleConversionError(error: any): CustomError;
export declare function handleValidationError(error: Error): void;
export declare function handleUnexpectedError(error: Error): void;
