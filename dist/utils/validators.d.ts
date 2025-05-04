/**
 * Validates if the input is a SQL query string
 */
export declare function isSqlQuery(input: any): boolean;
/**
 * Validates if the string is a valid SQL Server stored procedure name
 */
export declare function isValidProcedureName(name: any): boolean;
/**
 * Validates conversion parameters
 */
export declare function validateConversionParams(sql: any, options?: any): void;
export declare function validateDataType(data: any, expectedType: string): boolean;
export declare function validateConversionInput(input: any): void;
export declare function validateSqlProcedure(procedure: string): boolean;
export declare function validatePostgresFunction(functionCode: string): boolean;
