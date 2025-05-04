export * from './data-types';
export * from './functions';
export * from './procedures';
export * from './syntax';
/**
 * Main function to convert SQL Server code to PostgreSQL
 */
export declare function convertSqlServerToPostgres(sqlServerCode: string): string;
