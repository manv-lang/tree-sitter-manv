# Tree-sitter ManV

Tree-sitter grammar for the [ManV programming language](https://github.com/manv-lang/manv-lang).

## Overview

This grammar provides syntax highlighting, code folding, and structural analysis for ManV code in editors that support tree-sitter (such as Neovim, VS Code, and others).

## Features

The grammar supports the complete ManV language syntax including:

- **Basic Types**: `int`, `float`, `char`, `str`, `void`, `bool`, `byte`
- **Complex Types**: Arrays, pointers, generics, options, GC types, arena types
- **Declarations**: Functions, structs, typedefs, variables, constants
- **Control Flow**: `if`/`else`, `while`, `for`, `return`
- **System Calls**: `syscall` statements
- **OOP Features**: `impl` blocks, constructors, methods
- **Exception Handling**: `try`/`except`/`finally`, `raise`
- **Macros**: `macro` declarations with parameters
- **Module System**: `include` statements
- **Expressions**: Binary/unary operations, method calls, member access, indexing

## Installation

### For Neovim

1. Install the tree-sitter parser:

```bash
# Clone this repository
git clone https://github.com/manv-lang/tree-sitter-manv.git
cd tree-sitter-manv

# Generate the parser
npm install
npm run build

# Copy to Neovim parsers directory
mkdir -p ~/.local/share/nvim/site/parser
cp parser.so ~/.local/share/nvim/site/parser/manv.so
```

2. Configure nvim-treesitter in your Neovim config:

```lua
require'nvim-treesitter.configs'.setup {
  ensure_installed = { "manv" },
  highlight = {
    enable = true,
  },
  indent = {
    enable = true,
  },
}
```

### For VS Code

1. Install the Tree-sitter extension
2. Add this grammar to your workspace settings:

```json
{
  "treeSitter.grammars": {
    "manv": {
      "path": "./tree-sitter-manv"
    }
  }
}
```

## Usage

Once installed, the grammar will automatically provide:

- **Syntax Highlighting**: Color-coded keywords, types, functions, etc.
- **Code Folding**: Fold functions, structs, blocks, etc.
- **Structural Navigation**: Jump between functions, structs, etc.
- **Error Detection**: Basic syntax error detection

## Testing

Run the test suite to verify the grammar works correctly:

```bash
npm test
```

This will parse all test files in the `corpus/` directory and verify the generated syntax trees match the expected output.

## Contributing

1. Fork the repository
2. Make your changes to `grammar.js`
3. Add tests to `corpus/syntax_tests.txt` for new features
4. Run `npm test` to verify everything works
5. Submit a pull request

## Grammar Structure

The grammar is organized into several main sections:

- **Source File**: Top-level structure containing all declarations
- **Declarations**: Functions, structs, typedefs, variables, etc.
- **Types**: All type definitions and type expressions
- **Statements**: Control flow, assignments, expressions
- **Expressions**: All expression types and operators
- **OOP Features**: Impl blocks, constructors, methods
- **Advanced Features**: Exception handling, macros, re-exports

## License

MIT License - see LICENSE file for details.

## Related Projects

- [ManV Language](https://github.com/manv-lang/manv-lang) - The main ManV compiler
- [ManV Standard Library](https://github.com/manv-lang/stdlib) - Standard library modules
- [ManV Documentation](https://github.com/manv-lang/docs) - Language documentation