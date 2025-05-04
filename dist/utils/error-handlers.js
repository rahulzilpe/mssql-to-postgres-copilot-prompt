"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUnexpectedError = exports.handleValidationError = exports.handleConversionError = void 0;
const custom_error_1 = require("./custom-error");
/**
 * Handles errors during conversion
 */
function handleConversionError(error) {
    if (error instanceof custom_error_1.CustomError) {
        return error;
    }
    return new custom_error_1.CustomError(`Error during SQL conversion: ${error.message || 'Unknown error'}`, 'CONVERSION_ERROR', { originalError: error });
}
exports.handleConversionError = handleConversionError;
function handleValidationError(error) {
    console.error('Validation Error:', error.message);
    // Additional logging or error handling logic can be added here
}
exports.handleValidationError = handleValidationError;
function handleUnexpectedError(error) {
    console.error('Unexpected Error:', error.message);
    // Additional logging or error handling logic can be added here
}
exports.handleUnexpectedError = handleUnexpectedError;
