/**
 * Tree-sitter grammar for the ManV programming language.
 * 
 * ManV is a systems programming language targeting x86-64 Linux.
 * This grammar supports the unified syntax with:
 * - Type declarations (int, float, char, str, void, bool, array<T>, T*, gc<T>, etc.)
 * - Variable declarations with unified syntax
 * - Function declarations
 * - Struct declarations
 * - Typedef declarations
 * - Include statements
 * - Control flow (if/else, while, for)
 * - Syscalls
 * - Expressions and operators
 */

module.exports = grammar({
  name: "manv",

  extras: $ => [
    $.comment,
    /\s/
  ],

  conflicts: $ => [
    [$.type, $.identifier],
    [$.expression, $.type],
  ],

  rules: {
    // ============================================================================
    // Source File
    // ============================================================================

    source_file: $ => repeat(choice(
      $.import_statement,
      $.function_declaration,
      $.struct_declaration,
      $.typedef_declaration,
      $.variable_declaration,
      $.constant_declaration,
      $.extern_declaration,
    )),

    // ============================================================================
    // Comments
    // ============================================================================

    comment: $ => token(choice(
      seq("//", /.*/),
      seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")
    )),

    // ============================================================================
    // Literals
    // ============================================================================

    integer_literal: $ => token(choice(
      seq(/[0-9]+/),
      seq("0x", /[0-9a-fA-F]+/),
      seq("0b", /[01]+/),
      seq("0o", /[0-7]+/)
    )),

    float_literal: $ => token(
      choice(
        seq(/[0-9]+\.[0-9]+/, optional(seq(/[eE][+-]?[0-9]+/))),
        seq(/[0-9]+/, /[eE][+-]?[0-9]+/)
      )
    ),

    string_literal: $ => token(
      seq(
        '"',
        repeat(choice(
          /[^"\\]+/,
          seq("\\", /./)
        )),
        '"'
      )
    ),

    char_literal: $ => token(
      seq(
        "'",
        choice(
          /[^'\\]/,
          seq("\\", /./)
        ),
        "'"
      )
    ),

    boolean_literal: $ => choice("true", "false"),

    null_literal: $ => "null",

    array_literal: $ => seq(
      "[",
      commaSep($.expression),
      "]"
    ),

    // ============================================================================
    // Identifiers
    // ============================================================================

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // ============================================================================
    // Types
    // ============================================================================

    primitive_type: $ => choice(
      "int",
      "float",
      "char",
      "str",
      "void",
      "bool",
      "byte"
    ),

    type: $ => choice(
      $.primitive_type,
      $.array_type,
      $.pointer_type,
      $.generic_type,
      $.option_type,
      $.gc_type,
      $.arena_ref_type,
      $.arena_type,
      $.bytes_type,
      $.identifier  // User-defined types (structs, typedefs)
    ),

    array_type: $ => seq(
      "array",
      "<",
      $.type,
      optional(seq(",", $.integer_literal)),
      ">"
    ),

    pointer_type: $ => seq(
      $.type,
      repeat1("*")
    ),

    generic_type: $ => seq(
      $.identifier,
      "<",
      commaSep1($.type),
      ">"
    ),

    option_type: $ => seq(
      "Option",
      "<",
      $.type,
      ">"
    ),

    gc_type: $ => seq(
      "gc",
      "<",
      $.type,
      ">"
    ),

    arena_ref_type: $ => seq(
      "arena_ref",
      "<",
      $.type,
      ">"
    ),

    arena_type: $ => "arena",

    bytes_type: $ => seq(
      "bytes",
      optional(seq("<", $.integer_literal, ">"))
    ),

    // ============================================================================
    // Import/Include Statements
    // ============================================================================

    import_statement: $ => seq(
      "include",
      choice(
        $.string_literal,  // include "file.mv"
        seq(
          $.identifier,    // include symbol from "file.mv"
          "from",
          $.string_literal,
          optional(seq("as", $.identifier))
        )
      ),
      ";"
    ),

    // ============================================================================
    // Function Declaration
    // ============================================================================

    function_declaration: $ => seq(
      "fn",
      $.identifier,
      "(",
      commaSep($.parameter),
      ")",
      optional(seq("->", $.type)),
      choice(";", $.block)
    ),

    parameter: $ => seq(
      $.identifier,
      optional("&"),  // Reference parameter
      ":",
      $.type
    ),

    // ============================================================================
    // Struct Declaration
    // ============================================================================

    struct_declaration: $ => seq(
      "struct",
      optional($.alignas_attribute),
      $.identifier,
      "{",
      repeat($.struct_field),
      "}"
    ),

    struct_field: $ => seq(
      $.identifier,
      ":",
      $.type,
      ";"
    ),

    alignas_attribute: $ => seq(
      "alignas",
      "(",
      $.integer_literal,
      ")"
    ),

    // ============================================================================
    // Typedef Declaration
    // ============================================================================

    typedef_declaration: $ => seq(
      "typedef",
      $.type,
      optional(repeat1("*")),  // Pointer typedef
      $.identifier,
      ";"
    ),

    // ============================================================================
    // Variable Declaration
    // ============================================================================

    variable_declaration: $ => seq(
      $.type,
      optional("*"),  // Pointer
      $.identifier,
      optional(seq("=", $.expression)),
      ";"
    ),

    constant_declaration: $ => seq(
      "const",
      $.identifier,
      ":",
      $.type,
      "=",
      $.expression,
      ";"
    ),

    // ============================================================================
    // Extern Declaration
    // ============================================================================

    extern_declaration: $ => seq(
      "extern",
      choice(
        $.function_declaration,
        $.variable_declaration
      )
    ),

    // ============================================================================
    // Block and Statements
    // ============================================================================

    block: $ => seq(
      "{",
      repeat($.statement),
      "}"
    ),

    statement: $ => choice(
      $.variable_declaration,
      $.assignment_statement,
      $.expression_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.return_statement,
      $.syscall_statement,
      $.block
    ),

    // ============================================================================
    // Assignment
    // ============================================================================

    assignment_statement: $ => seq(
      $.expression,
      choice("=", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^="),
      $.expression,
      ";"
    ),

    // ============================================================================
    // Expression Statement
    // ============================================================================

    expression_statement: $ => seq(
      $.expression,
      ";"
    ),

    // ============================================================================
    // Control Flow
    // ============================================================================

    if_statement: $ => seq(
      "if",
      "(",
      $.expression,
      ")",
      choice($.block, $.statement),
      optional(seq(
        "else",
        choice($.block, $.statement)
      ))
    ),

    while_statement: $ => seq(
      "while",
      "(",
      $.expression,
      ")",
      choice($.block, $.statement)
    ),

    for_statement: $ => seq(
      "for",
      "(",
      choice(
        $.variable_declaration,
        $.expression_statement,
        ";"
      ),
      optional($.expression),
      ";",
      optional($.expression),
      ")",
      choice($.block, $.statement)
    ),

    return_statement: $ => seq(
      "return",
      optional($.expression),
      ";"
    ),

    // ============================================================================
    // Syscall
    // ============================================================================

    syscall_statement: $ => seq(
      "syscall",
      $.expression,
      repeat(seq(",", $.expression)),
      optional(seq(",", $.identifier)),  // Error output
      ";"
    ),

    // ============================================================================
    // Expressions
    // ============================================================================

    expression: $ => choice(
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      $.method_call_expression,
      $.member_expression,
      $.index_expression,
      $.cast_expression,
      $.sizeof_expression,
      $.addressof_expression,
      $.dereference_expression,
      $.parenthesized_expression,
      $.primary_expression
    ),

    binary_expression: $ => choice(
      // Logical (lowest precedence)
      prec.left(1, seq($.expression, "||", $.expression)),
      prec.left(2, seq($.expression, "&&", $.expression)),
      // Bitwise
      prec.left(3, seq($.expression, "|", $.expression)),
      prec.left(4, seq($.expression, "^", $.expression)),
      prec.left(5, seq($.expression, "&", $.expression)),
      // Equality
      prec.left(6, seq($.expression, "==", $.expression)),
      prec.left(6, seq($.expression, "!=", $.expression)),
      // Comparison
      prec.left(7, seq($.expression, "<", $.expression)),
      prec.left(7, seq($.expression, "<=", $.expression)),
      prec.left(7, seq($.expression, ">", $.expression)),
      prec.left(7, seq($.expression, ">=", $.expression)),
      // Shift
      prec.left(8, seq($.expression, "<<", $.expression)),
      prec.left(8, seq($.expression, ">>", $.expression)),
      // Additive
      prec.left(9, seq($.expression, "+", $.expression)),
      prec.left(9, seq($.expression, "-", $.expression)),
      // Multiplicative
      prec.left(10, seq($.expression, "*", $.expression)),
      prec.left(10, seq($.expression, "/", $.expression)),
      prec.left(10, seq($.expression, "%", $.expression))
    ),

    unary_expression: $ => choice(
      seq("-", $.expression),
      seq("+", $.expression),
      seq("!", $.expression),
      seq("~", $.expression),
      seq("--", $.expression),
      seq("++", $.expression),
      prec(11, seq($.expression, "--")),
      prec(11, seq($.expression, "++"))
    ),

    call_expression: $ => seq(
      $.expression,
      "(",
      commaSep($.expression),
      ")"
    ),

    method_call_expression: $ => seq(
      $.expression,
      ".",
      $.identifier,
      "(",
      commaSep($.expression),
      ")"
    ),

    member_expression: $ => seq(
      $.expression,
      ".",
      $.identifier
    ),

    index_expression: $ => seq(
      $.expression,
      "[",
      $.expression,
      "]"
    ),

    cast_expression: $ => seq(
      "(",
      $.type,
      ")",
      $.expression
    ),

    sizeof_expression: $ => seq(
      "sizeof",
      choice(
        seq("(", $.type, ")"),
        $.expression
      )
    ),

    addressof_expression: $ => seq(
      "&",
      $.expression
    ),

    dereference_expression: $ => seq(
      "*",
      $.expression
    ),

    parenthesized_expression: $ => seq(
      "(",
      $.expression,
      ")"
    ),

    primary_expression: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.char_literal,
      $.boolean_literal,
      $.null_literal,
      $.array_literal,
      $.identifier
    ),
  }
});

/**
 * Helper functions for comma-separated lists
 */

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}