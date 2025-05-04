import { CustomError } from './custom-error';

export function handleConversionError(error: Error): void {
    console.error('Conversion Error:', error.message);
    // Additional logging or error handling logic can be added here
}

export function handleValidationError(error: Error): void {
    console.error('Validation Error:', error.message);
    // Additional logging or error handling logic can be added here
}

export function handleUnexpectedError(error: Error): void {
    console.error('Unexpected Error:', error.message);
    // Additional logging or error handling logic can be added here
}