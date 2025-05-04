import { CustomError } from './custom-error';

/**
 * Handles errors during conversion
 */
export function handleConversionError(error: any): CustomError {
  if (error instanceof CustomError) {
    return error;
  }
  
  return new CustomError(
    `Error during SQL conversion: ${error.message || 'Unknown error'}`,
    'CONVERSION_ERROR',
    { originalError: error }
  );
}

export function handleValidationError(error: Error): void {
    console.error('Validation Error:', error.message);
    // Additional logging or error handling logic can be added here
}

export function handleUnexpectedError(error: Error): void {
    console.error('Unexpected Error:', error.message);
    // Additional logging or error handling logic can be added here
}