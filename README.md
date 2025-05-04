# mssql-to-postgres-prompt-library

## Overview

The `mssql-to-postgres-prompt-library` is a comprehensive library designed to facilitate the conversion of SQL Server stored procedures and functions to their PostgreSQL equivalents. This library provides a set of tools, templates, and guidelines to streamline the conversion process, ensuring accuracy and efficiency.

## Features

- **Data Type Conversion**: Functions and constants to handle data type mappings between SQL Server and PostgreSQL.
- **Function and Procedure Conversion**: Utilities for converting SQL Server functions and stored procedures into PostgreSQL functions.
- **Syntax Utilities**: Tools to assist in converting SQL Server syntax to PostgreSQL syntax.
- **Templates**: Predefined SQL templates for creating PostgreSQL functions and procedures based on SQL Server definitions.
- **Error Handling**: Utility functions for managing errors that may arise during the conversion process.
- **Validation**: Functions to validate conversion inputs for correctness.

## Directory Structure

```
mssql-to-postgres-prompt-library
├── src
│   ├── converters
│   ├── templates
│   └── utils
├── docs
├── tests
├── .gitignore
├── package.json
└── tsconfig.json
```

## Installation

To install the library, clone the repository and run:

```
npm install
```

## Usage

Import the necessary modules from the library to perform conversions:

```typescript
import { convertDataType, convertFunction, convertProcedure } from './src/converters';
```

Refer to the documentation in the `docs` directory for detailed guidelines on usage and examples.

## GitHub Copilot Integration

This library is designed to work seamlessly with GitHub Copilot. To use it with Copilot:

### Option 1: Reference via GitHub Repository

Add this to your VS Code settings.json:

```json
{
  "github.copilot.advanced": {
    "repositories": [
      "https://github.com/rahulzilpe/mssql-to-postgres-copilot-prompt"
    ]
  }
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.