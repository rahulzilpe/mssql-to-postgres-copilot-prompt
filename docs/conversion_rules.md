# SQL Server to PostgreSQL Conversion Rules

This document outlines the rules and best practices for converting SQL Server stored procedures and functions to PostgreSQL. These guidelines should be followed consistently to ensure reliable and error-free conversions.

## General Syntax Conversion

### Procedure/Function Declaration

**SQL Server:**
```sql
CREATE PROCEDURE [schema].[procedure_name]
@param1 DataType,
@param2 DataType
AS
BEGIN
    -- Code
END
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION schema.procedure_name(
    p_param1 data_type,
    p_param2 data_type
)
RETURNS return_type AS $function$
BEGIN
    -- Code
    RETURN result;
END;
$function$ LANGUAGE plpgsql;
```

- Always use `CREATE OR REPLACE FUNCTION` to allow easy updating
- Use `p_` prefix for parameter names to distinguish them from column names
- Always specify a return type (even if it's VOID)
- Use `$function$` as delimiter rather than single quotes for better nesting
- Always specify the language as `plpgsql` explicitly

## Data Type Mapping

| SQL Server Type | PostgreSQL Type | Notes |
|----------------|----------------|-------|
| INT | INTEGER | |
| BIGINT | BIGINT | |
| SMALLINT | SMALLINT | |
| TINYINT | SMALLINT | PostgreSQL has no TINYINT |
| BIT | BOOLEAN | |
| DECIMAL(p,s) | DECIMAL(p,s) | Same precision and scale |
| NUMERIC(p,s) | NUMERIC(p,s) | Same precision and scale |
| MONEY | NUMERIC(19,4) | |
| FLOAT | DOUBLE PRECISION | |
| REAL | REAL | |
| DATETIME | TIMESTAMP | No timezone by default |
| DATETIME2 | TIMESTAMP | Higher precision |
| DATE | DATE | |
| TIME | TIME | |
| CHAR(n) | CHAR(n) | |
| VARCHAR(n) | VARCHAR(n) | For compatibility, maintain VARCHAR rather than TEXT |
| VARCHAR(MAX) | VARCHAR | As per specific requirements, avoid using TEXT |
| NVARCHAR(n) | VARCHAR(n) | PostgreSQL handles Unicode by default |
| NVARCHAR(MAX) | VARCHAR | Do not convert to TEXT unless specified |
| TEXT | TEXT | |
| NTEXT | TEXT | |
| UNIQUEIDENTIFIER | UUID | |
| XML | XML | |
| VARBINARY | BYTEA | |
| HIERARCHYID | No direct equivalent | Use ltree extension |

## Syntax Replacements

### Variable Declarations

**SQL Server:**
```sql
DECLARE @variable_name DataType = value
```

**PostgreSQL:**
```sql
variable_name data_type;
variable_name := value;
```

### IF Statements

**SQL Server:**
```sql
IF condition
BEGIN
    -- code
END
ELSE
BEGIN
    -- code
END
```

**PostgreSQL:**
```sql
IF condition THEN
    -- code
ELSE
    -- code
END IF;
```

### Temporary Tables

**SQL Server:**
```sql
CREATE TABLE #TempTable (col1 int)
```

**PostgreSQL:**
```sql
CREATE TEMPORARY TABLE temp_table (col1 int) ON COMMIT DROP;
```

### String Concatenation

**SQL Server:** `+` operator  
**PostgreSQL:** `||` operator

### Date Functions

| SQL Server | PostgreSQL | Notes |
|------------|------------|-------|
| GETDATE() | CURRENT_TIMESTAMP | |
| DATEADD(unit, value, date) | date + INTERVAL 'value unit' | |
| DATEDIFF(unit, start, end) | EXTRACT(EPOCH FROM end - start)/86400 | For days difference |
| DATEPART(unit, date) | EXTRACT(unit FROM date) | |

### NULL Handling

**SQL Server:**
```sql
ISNULL(expression, replacement)
```

**PostgreSQL:**
```sql
COALESCE(expression, replacement)
```

### TOP Clause

**SQL Server:**
```sql
SELECT TOP 10 * FROM table
```

**PostgreSQL:**
```sql
SELECT * FROM table LIMIT 10
```

### String Functions Conversion

| SQL Server | PostgreSQL | Notes |
|------------|------------|-------|
| LEN() | LENGTH() | |
| SUBSTRING() | SUBSTRING() | Similar syntax |
| CHARINDEX(substr, str) | POSITION(substr IN str) | |
| PATINDEX() | Use regexp_matches() | |
| REPLACE() | REPLACE() | Same syntax |
| UPPER() | UPPER() | Same syntax |
| LOWER() | LOWER() | Same syntax |
| LTRIM/RTRIM | TRIM() | PostgreSQL has TRIM LEADING/TRAILING |

### Type Conversion

**SQL Server:**
```sql
CAST(expression AS type)
CONVERT(type, expression)
```

**PostgreSQL:**
```sql
CAST(expression AS type)
expression::type
```

### Critical PostgreSQL-Specific Considerations

1. **Explicit Type Casting**: Always use explicit type casts in RETURN QUERY statements to match the function's declared return types. For example:
   ```sql
   RETURN QUERY
   SELECT 
       col1::VARCHAR,
       col2::INTEGER
   FROM table;
   ```

2. **Parameter Type Handling**: When checking if parameters are NULL or empty strings, use:
   ```sql
   (parameter IS NULL OR parameter::text = '')
   ```

3. **String Arrays**: Replace SQL Server table-valued parameters or string splitting with PostgreSQL arrays:
   ```sql
   -- SQL Server: SELECT DATA FROM dbo.UFN_Split(@Values, ',')
   -- PostgreSQL: Use string_to_array() and ANY operator
   SELECT * FROM table WHERE column = ANY(string_to_array(p_values, ','))
   ```

4. **Case Sensitivity**: PostgreSQL is case-sensitive by default. Use double quotes for identifiers with mixed case:
   ```sql
   SELECT "Column1", "Column2" FROM "Table";
   ```

5. **Object Schemas**: Always include the schema name in object references:
   ```sql
   schema_name.table_name
   schema_name.function_name
   ```

6. **RETURNS TABLE Syntax**: For functions returning result sets, use:
   ```sql
   CREATE OR REPLACE FUNCTION schema.function_name(parameters)
   RETURNS TABLE (
       column1 type1,
       column2 type2
   ) AS $function$
   BEGIN
       RETURN QUERY
       SELECT col1, col2 FROM table;
   END;
   $function$ LANGUAGE plpgsql;
   ```

7. **Boolean Expressions**: PostgreSQL uses TRUE/FALSE instead of 1/0 for boolean values
   ```sql
   -- SQL Server: WHERE active = 1
   -- PostgreSQL: WHERE active = TRUE
   ```

## Testing Converted Functions

1. Always create test cases with sample data that verify:
   - All parameter combinations
   - NULL handling
   - Edge cases
   - Expected output formats match

2. Compare result sets between SQL Server and PostgreSQL versions

3. Check for type mismatch errors in the PostgreSQL log

## Comprehensive Conversion Rules

Use these comprehensive rules when converting SQL Server procedures to PostgreSQL functions:

1. **Function Signature Conversion**:
   - Convert CREATE PROCEDURE to CREATE OR REPLACE FUNCTION
   - Add prefix 'p_' to parameter names
   - Remove @ from parameter names
   - Use the syntax 'AS $BODY$' for the function body delimiter, NOT $function$
   - End the function with '$BODY$ LANGUAGE plpgsql;'
   - Add LANGUAGE plpgsql
   - Ensure the function is created in the public schema by prefixing the function name with 'public.'
   - IMPORTANT: The proper format is 'AS $BODY$' with space before and after the dollar quotes

2. **Data Type Mappings**:
   - VARCHAR(MAX)/NVARCHAR(MAX) → TEXT
   - VARCHAR(n)/NVARCHAR(n) → VARCHAR(n)
   - DATETIME2 with NOT NULL default '0001-01-01 00:00:00.0000000' → TIMESTAMP DEFAULT LOCALTIMESTAMP
   - BIT → BOOLEAN
   - BIGINT → BIGINT
   - INT → INTEGER
   - UNIQUEIDENTIFIER → UUID
   - VARBINARY → BYTEA

3. **Internal Operations**:
   - @variable += N', value' → string_agg(value, ', ')
   - QUOTENAME(column) → quote_ident(column)
   - STUFF(@str, start, len, replace) → overlay(replace placing str from start for len)
   - EXEC sp_executesql @sql → EXECUTE v_sql
   - Division operations → Add NULLIF to prevent division by zero

4. **NULL and Type Handling**:
   - (@param IS NULL OR @param = '') → (p_param IS NULL OR p_param::text = '')
   - ISNULL → COALESCE
   - Add explicit type casts in RETURN QUERY statements
   - Use COALESCE for division operations

5. **String Operations**:
   - String concatenation (+) → ||
   - SELECT DATA FROM dbo.UFN_Split → Use string_to_array and ANY operator
   - CHARINDEX → POSITION
   - PATINDEX → regexp_matches

6. **Identifier Handling**:
   - Preserve case sensitivity
   - Quote identifiers with mixed case
   - Maintain schema prefixes
   - Quote all object names consistently

7. **Table Operations**:
   - #temp tables → CREATE TEMPORARY TABLE ... ON COMMIT DROP
   - Remove SQL Server-specific table options
   - Convert table variables to temporary tables

8. **Control Flow and Error Handling**:
   - IF/BEGIN/END → IF/THEN/END IF
   - WHILE → WHILE LOOP/END LOOP
   - TRY/CATCH → BEGIN/EXCEPTION/END
   - RAISERROR → RAISE EXCEPTION
   - PRINT → RAISE NOTICE
   - @@ERROR → SQLSTATE

9. **Function Return Handling**:
   - For table returns: RETURNS TABLE with column definitions
   - Add explicit type casting to match return types
   - Handle void procedures appropriately
   - Convert OUTPUT parameters to INOUT

10. **Transaction Handling**:
    - COMPLETELY REMOVE all transaction-related statements including:
      * BEGIN TRANSACTION / BEGIN TRAN
      * COMMIT TRANSACTION / COMMIT TRAN
      * ROLLBACK TRANSACTION / ROLLBACK TRAN
      * SAVE TRANSACTION / SAVE TRAN
      * SET TRANSACTION ISOLATION LEVEL
    - PostgreSQL functions automatically run in their own transaction scope
    - Do not add any transaction statements to the converted function

11. **PIVOT Operations**:
    - IMPORTANT: PostgreSQL does NOT support the PIVOT keyword. You MUST convert ALL PIVOT operations to crosstab functions.
    - FIRST LINE in the function body MUST be: CREATE EXTENSION IF NOT EXISTS tablefunc;
    - NEVER keep the original PIVOT syntax in the PostgreSQL code - it will cause errors.
    
    - Conversion pattern for:
      ```sql
      SELECT * FROM SourceQuery
      PIVOT (Aggregate(ValueColumn) FOR CategoryColumn IN (Value1, Value2, ...)) AS PivotResult
      ```
      
    - Replace with:
      ```sql
      SELECT * FROM crosstab(
          $sql$
          SELECT RowIdentifier, CategoryColumn, Aggregate(ValueColumn)
          FROM SourceQuery
          GROUP BY RowIdentifier, CategoryColumn
          ORDER BY RowIdentifier
          $sql$,
          $sql$VALUES ('Value1'), ('Value2'), ....$sql$
      ) AS ct(RowIdentifier Type, "Value1" Type, "Value2" Type, ...)
      ```
      
    - For parameter handling in the crosstab source query:
      * Convert SQL Server parameter tests like @param IS NULL to PostgreSQL p_param IS NULL OR p_param = ''
      * NEVER use string concatenation with || for parameter values in crosstab SQL queries
      * Replace SQL Server IN (@param) clauses with ANY(string_to_array(p_param, ',')) pattern
      * Do not use SELECT DATA FROM syntax - replace with ANY() function
      
    - Convert all SQL Server style IN (SELECT DATA FROM string_to_array(...)) to PostgreSQL = ANY(string_to_array(...))
    
    - Example conversion:
      * SQL Server:
        ```sql
        SELECT * FROM (
            SELECT Year, Region, Sales FROM SalesData
        ) AS SourceTable
        PIVOT (
            SUM(Sales) FOR Region IN ([North], [South], [East], [West])
        ) AS PivotTable;
        ```
        
      * PostgreSQL:
        ```sql
        SELECT * FROM crosstab(
            $sql$
            SELECT Year, Region, SUM(Sales) 
            FROM SalesData 
            GROUP BY Year, Region 
            ORDER BY Year
            $sql$,
            $sql$VALUES ('North'), ('South'), ('East'), ('West')$sql$
        ) AS ct(Year INT, "North" NUMERIC, "South" NUMERIC, "East" NUMERIC, "West" NUMERIC);
        ```

12. **Function Structure**:
    - Always use this exact structure for functions:
      ```sql
      CREATE OR REPLACE FUNCTION public.function_name(params)
      RETURNS type AS $BODY$
      BEGIN
        CREATE EXTENSION IF NOT EXISTS tablefunc; -- if using crosstab
        -- function body here
      END;
      $BODY$ LANGUAGE plpgsql;
      ```

## Common Conversion Errors and Solutions

1. **Type mismatch in RETURNS TABLE**: If you get "structure of query does not match function result type" errors, use explicit casting in your SELECT statements to match the return type definition.

2. **Handling empty strings vs NULLs**: PostgreSQL treats empty strings and NULLs differently than SQL Server. Use COALESCE to handle both cases.

3. **String splitting**: Replace SQL Server's table-valued functions for string splitting with PostgreSQL's string_to_array() function.

4. **Date handling**: Be aware that date/time functions and formats differ significantly. Always test date manipulations thoroughly.

5. **Transaction handling**: PostgreSQL has different transaction isolation levels and behaviors.