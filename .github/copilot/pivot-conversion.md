# SQL Server PIVOT to PostgreSQL crosstab Conversion

This guide covers how to convert SQL Server PIVOT operations to PostgreSQL crosstab functions.

## Critical Requirement

PostgreSQL does NOT support SQL Server's PIVOT keyword. All PIVOT operations must be converted to crosstab functions from the tablefunc extension.

## Setup Requirement

**IMPORTANT**: The first line in any function using crosstab MUST be:
```sql
CREATE EXTENSION IF NOT EXISTS tablefunc;