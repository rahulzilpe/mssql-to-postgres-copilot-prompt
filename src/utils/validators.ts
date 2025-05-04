import { isString, isNumber } from 'lodash';

/**
 * Validates if the input is a SQL query string
 */
export function isSqlQuery(input: any): boolean {
  return isString(input) && input.trim().length > 0;
}

/**
 * Validates if the string is a valid SQL Server stored procedure name
 */
export function isValidProcedureName(name: any): boolean {
  if (!isString(name)) return false;
  return /^[a-zA-Z_][a-zA-Z0-9_@#$]*(\.[a-zA-Z_][a-zA-Z0-9_@#$]*)?$/.test(name);
}

/**
 * Validates conversion parameters
 */
export function validateConversionParams(sql: any, options?: any): void {
  if (!isSqlQuery(sql)) {
    throw new Error("Invalid SQL input");
  }
  
  // Add more validation as needed
}

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

export function validateSqlProcedure(procedure: string): boolean {
    // Check if the string contains a valid SQL procedure definition
    if (!procedure.match(/CREATE\s+PROCEDURE|PROC\s+/i)) {
        return false;
    }
    
    // Check for balanced parentheses, quotes, etc.
    const openParens = (procedure.match(/\(/g) || []).length;
    const closeParens = (procedure.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
        return false;
    }
    
    // Check for BEGIN/END balance
    const beginCount = (procedure.match(/\bBEGIN\b/gi) || []).length;
    const endCount = (procedure.match(/\bEND\b/gi) || []).length;
    
    if (beginCount !== endCount) {
        return false;
    }
    
    return true;
}

export function validatePostgresFunction(functionCode: string): boolean {
    // Check if the string contains a valid PostgreSQL function definition
    if (!functionCode.match(/CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION/i)) {
        return false;
    }
    
    // Check for required PostgreSQL function elements
    if (!functionCode.includes('LANGUAGE plpgsql')) {
        return false;
    }
    
    // Check for dollar quoting
    if (!functionCode.match(/\$[^\$]*\$/)) {
        return false;
    }
    
    return true;
}