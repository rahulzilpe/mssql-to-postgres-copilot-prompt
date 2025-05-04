# Data Type Conversion Examples

This document provides examples of data type conversions between SQL Server and PostgreSQL. It serves as a reference for developers during the migration process.

## Integer Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| INT            | INTEGER        | `SELECT CAST(123 AS INTEGER);` |
| BIGINT         | BIGINT         | `SELECT CAST(1234567890123 AS BIGINT);` |
| SMALLINT       | SMALLINT       | `SELECT CAST(123 AS SMALLINT);` |
| TINYINT        | SMALLINT       | `SELECT CAST(123 AS SMALLINT);` |

## Floating Point Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| FLOAT          | DOUBLE PRECISION | `SELECT CAST(123.45 AS DOUBLE PRECISION);` |
| REAL           | REAL           | `SELECT CAST(123.45 AS REAL);` |

## String Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| CHAR(n)        | CHAR(n)        | `SELECT CAST('text' AS CHAR(10));` |
| VARCHAR(n)     | VARCHAR(n)     | `SELECT CAST('text' AS VARCHAR(10));` |
| NVARCHAR(n)    | VARCHAR(n)     | `SELECT CAST('text' AS VARCHAR(10));` |
| TEXT           | TEXT           | `SELECT CAST('long text' AS TEXT);` |

## Date and Time Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| DATETIME       | TIMESTAMP      | `SELECT CAST('2023-01-01 12:00:00' AS TIMESTAMP);` |
| DATE           | DATE           | `SELECT CAST('2023-01-01' AS DATE);` |
| TIME           | TIME           | `SELECT CAST('12:00:00' AS TIME);` |

## Boolean Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| BIT            | BOOLEAN        | `SELECT CAST(1 AS BOOLEAN);` |

## Miscellaneous Types

| SQL Server Type | PostgreSQL Type | Example |
|----------------|----------------|---------|
| UNIQUEIDENTIFIER | UUID          | `SELECT CAST('550e8400-e29b-41d4-a716-446655440000' AS UUID);` |
| XML            | XML            | `SELECT CAST('<root></root>' AS XML);` |
| VARBINARY      | BYTEA          | `SELECT CAST('some binary data' AS BYTEA);` |

This document should be updated with additional examples as needed to cover more data types and edge cases encountered during conversions.