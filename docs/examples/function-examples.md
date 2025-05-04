# Function Conversion Examples

This document provides examples of converting SQL Server functions to their PostgreSQL equivalents. Each example includes the SQL Server function definition followed by the corresponding PostgreSQL function.

## Example 1: Simple Scalar Function

**SQL Server:**
```sql
CREATE FUNCTION dbo.GetFullName(@FirstName NVARCHAR(50), @LastName NVARCHAR(50))
RETURNS NVARCHAR(100)
AS
BEGIN
    RETURN @FirstName + ' ' + @LastName;
END;
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION GetFullName(p_FirstName VARCHAR(50), p_LastName VARCHAR(50))
RETURNS VARCHAR(100) AS $function$
BEGIN
    RETURN p_FirstName || ' ' || p_LastName;
END;
$function$ LANGUAGE plpgsql;
```

## Example 2: Function with Conditional Logic

**SQL Server:**
```sql
CREATE FUNCTION dbo.GetDiscount(@Amount DECIMAL(10, 2))
RETURNS DECIMAL(10, 2)
AS
BEGIN
    IF @Amount > 100
        RETURN @Amount * 0.1;
    RETURN 0;
END;
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION GetDiscount(p_Amount NUMERIC(10, 2))
RETURNS NUMERIC(10, 2) AS $function$
BEGIN
    IF p_Amount > 100 THEN
        RETURN p_Amount * 0.1;
    END IF;
    RETURN 0;
END;
$function$ LANGUAGE plpgsql;
```

## Example 3: Function with Table Return

**SQL Server:**
```sql
CREATE FUNCTION dbo.GetEmployeesByDepartment(@DepartmentID INT)
RETURNS TABLE
AS
RETURN
(
    SELECT * FROM Employees WHERE DepartmentID = @DepartmentID
);
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION GetEmployeesByDepartment(p_DepartmentID INT)
RETURNS TABLE (EmployeeID INT, Name VARCHAR, DepartmentID INT) AS $function$
BEGIN
    RETURN QUERY
    SELECT * FROM Employees WHERE DepartmentID = p_DepartmentID;
END;
$function$ LANGUAGE plpgsql;
```

## Example 4: Function with Error Handling

**SQL Server:**
```sql
CREATE FUNCTION dbo.SafeDivide(@Numerator DECIMAL(10, 2), @Denominator DECIMAL(10, 2))
RETURNS DECIMAL(10, 2)
AS
BEGIN
    RETURN CASE 
        WHEN @Denominator = 0 THEN NULL 
        ELSE @Numerator / @Denominator 
    END;
END;
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION SafeDivide(p_Numerator NUMERIC(10, 2), p_Denominator NUMERIC(10, 2))
RETURNS NUMERIC(10, 2) AS $function$
BEGIN
    IF p_Denominator = 0 THEN
        RETURN NULL;
    ELSE
        RETURN p_Numerator / p_Denominator;
    END IF;
END;
$function$ LANGUAGE plpgsql;
```

## Conclusion

These examples illustrate common patterns for converting SQL Server functions to PostgreSQL. Adjustments may be necessary based on specific use cases and requirements.