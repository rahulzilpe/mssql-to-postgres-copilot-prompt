import { isString, isNumber } from 'lodash';

export function validateDataType(data: any, expectedType: string): boolean {
    switch (expectedType) {
        case 'string':
            return isString(data);
        case 'number':
            return isNumber(data);
        case 'boolean':
            return typeof data === 'boolean';
        case 'array':
            return Array.isArray(data);
        case 'object':
            return data !== null && typeof data === 'object' && !Array.isArray(data);
        default:
            throw new Error(`Unknown expected type: ${expectedType}`);
    }
}

export function validateConversionInput(input: any): void {
    if (!input || typeof input !== 'object') {
        throw new Error('Invalid input: Input must be a non-null object.');
    }

    // Additional validation logic can be added here
}