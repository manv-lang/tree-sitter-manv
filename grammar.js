/**
 * Tree-sitter grammar for the real ManV frontend.
 *
 * Why this file exists:
 * - The compiler frontend is indentation-based, not brace-based.
 * - GPU work introduced `@gpu`, range loops, and additional type aliases that
 *   editors need to understand without diverging from the actual parser.
 *
 * Important alignment goals:
 * - Keep the syntax close to `manv/manv/parser.py` rather than inventing a
 *   separate editor-only language.
 * - Model newline/indent/dedent explicitly so block structure matches the
 *   compiler's deterministic indentation rules.
 * - Preserve the current surface area first; semantic validation still lives in
 *   the compiler and is intentionally not duplicated here.
 */

const PREC = {
  RANGE: 1,
  OR: 2,
  AND: 3,
  EQUALITY: 4,
  COMPARISON: 5,
  ADD: 6,
  MUL: 7,
  UNARY: 8,
  POSTFIX: 9,
};

module.exports = grammar({
  name: "manv",

  externals: $ => [
    $.newline,
    $.indent,
    $.dedent,
  ],

  extras: $ => [
    /[ \t\f\r]+/,
    $.comment,
  ],

  supertypes: $ => [
    $._statement,
    $._expression,
  ],

  conflicts: $ => [
    [$.type],
  ],

  rules: {
    source_file: $ => repeat(choice(
      $._top_level_item,
      $.newline,
    )),

    comment: _ => token(seq("#", /.*/)),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    integer_literal: _ => token(/[0-9]+/),
    float_literal: _ => token(/[0-9]+\.[0-9]+/),
    string_literal: _ => token(choice(
      seq('"', repeat(choice(/[^"\\\n]+/, seq("\\", /./))), '"'),
      seq("'", repeat(choice(/[^'\\\n]+/, seq("\\", /./))), "'"),
    )),
    boolean_literal: _ => choice("true", "false", "True", "False"),
    none_literal: _ => "none",

    builtin_type: _ => choice(
      "int",
      "i32",
      "str",
      "array",
      "map",
      "u8",
      "usize",
      "float",
      "f32",
      "bool",
      "void",
    ),

    _top_level_item: $ => choice(
      $.function_declaration,
      $.type_declaration,
      $.impl_declaration,
      $.macro_declaration,
      $._statement,
    ),

    decorator: $ => seq(
      "@",
      field("name", choice($.identifier, alias("gpu", $.identifier))),
      optional($.decorator_arguments),
    ),

    decorator_arguments: $ => seq(
      "(",
      optional(commaSep1($.decorator_argument)),
      ")",
    ),

    decorator_argument: $ => choice(
      $.keyword_argument,
      $._expression,
    ),

    keyword_argument: $ => seq(
      field("name", $.identifier),
      "=",
      field("value", $._expression),
    ),

    function_declaration: $ => seq(
      repeat(seq($.decorator, $.newline)),
      "fn",
      field("name", $.identifier),
      "(",
      optional(commaSep($.parameter)),
      ")",
      optional(seq("->", field("return_type", $.type))),
      ":",
      field("body", $.block),
    ),

    parameter: $ => seq(
      field("name", $.identifier),
      ":",
      field("type", $.type),
    ),

    type_declaration: $ => seq(
      choice("type", "class"),
      field("name", $.identifier),
      optional(seq("(", field("base", $.identifier), ")")),
      ":",
      field("body", $.method_block),
    ),

    impl_declaration: $ => seq(
      "impl",
      field("target", $.identifier),
      ":",
      field("body", $.method_block),
    ),

    method_block: $ => seq(
      $.newline,
      $.indent,
      repeat(choice(
        $.newline,
        seq($.function_declaration, optional($.newline)),
      )),
      $.dedent,
    ),

    macro_declaration: $ => seq(
      "macro",
      field("name", $.identifier),
      optional(seq("(", optional(commaSep($.identifier)), ")")),
      ":",
      field("body", $.stub_block),
    ),

    stub_block: $ => seq(
      $.newline,
      $.indent,
      repeat(choice(
        $.newline,
        seq($.macro_line, optional($.newline)),
      )),
      $.dedent,
    ),

    macro_line: _ => token(/[^\n]+/),

    import_statement: $ => seq(
      "import",
      field("module", $.module_path),
      optional(seq("as", field("alias", $.identifier))),
    ),

    from_import_statement: $ => seq(
      "from",
      field("module", choice($.module_path, $.relative_module_path)),
      "import",
      field("name", $.identifier),
      optional(seq("as", field("alias", $.identifier))),
    ),

    module_path: $ => seq(
      $.module_segment,
      repeat(seq(".", $.module_segment)),
    ),

    relative_module_path: $ => seq(
      repeat1("."),
      optional($.module_path),
    ),

    module_segment: $ => choice(
      $.identifier,
      alias("str", $.identifier),
      alias("int", $.identifier),
      alias("float", $.identifier),
      alias("bool", $.identifier),
      alias("type", $.identifier),
      alias("array", $.identifier),
      alias("map", $.identifier),
    ),

    _statement: $ => choice(
      $.import_statement,
      $.from_import_statement,
      $.typed_variable_statement,
      $.let_statement,
      $.return_with_value_statement,
      $.return_statement,
      $.raise_with_value_statement,
      $.raise_statement,
      $.break_statement,
      $.continue_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.try_statement,
      $.assignment_statement,
      $.attribute_assignment_statement,
      $.index_assignment_statement,
      $.unsupported_statement,
      $.expression_statement,
    ),

    typed_variable_statement: $ => prec.right(1, choice(
      seq(
        field("type", $.c_decl_type),
        field("name", $.identifier),
        field("array_size", seq("[", $._expression, "]")),
        "=",
        field("value", $._expression),
      ),
      seq(
        field("type", $.c_decl_type),
        field("name", $.identifier),
        field("array_size", seq("[", $._expression, "]")),
      ),
      seq(
        field("type", $.c_decl_type),
        field("name", $.identifier),
        "=",
        field("value", $._expression),
      ),
      seq(
        field("type", $.c_decl_type),
        field("name", $.identifier),
      ),
    )),

    c_decl_type: _ => choice(
      "int",
      "i32",
      "str",
      "array",
      "map",
      "u8",
      "usize",
      "float",
      "f32",
      "bool",
    ),

    let_statement: $ => seq(
      "let",
      field("name", $.identifier),
      optional(seq(":", field("type", $.type))),
      optional(seq("=", field("value", $._expression))),
    ),

    return_statement: _ => prec(-1, "return"),

    return_with_value_statement: $ => prec(1, seq(
      "return",
      field("value", $._expression),
    )),

    raise_statement: _ => prec(-1, "raise"),

    raise_with_value_statement: $ => prec(1, seq(
      "raise",
      field("value", $._expression),
    )),

    break_statement: _ => "break",
    continue_statement: _ => "continue",

    if_statement: $ => seq(
      "if",
      field("condition", $._expression),
      ":",
      field("consequence", $.block),
      optional($.else_clause),
    ),

    else_clause: $ => seq(
      "else",
      ":",
      field("body", $.block),
    ),

    while_statement: $ => seq(
      "while",
      field("condition", $._expression),
      ":",
      field("body", $.block),
    ),

    for_statement: $ => seq(
      "for",
      field("name", $.identifier),
      "in",
      field("iterable", $._expression),
      ":",
      field("body", $.block),
    ),

    try_statement: $ => seq(
      "try",
      ":",
      field("body", $.block),
      choice(
        seq(
          repeat1($.except_clause),
          optional($.else_clause),
          optional($.finally_clause),
        ),
        $.finally_clause,
      ),
    ),

    except_clause: $ => seq(
      "except",
      field("type", $.identifier),
      optional(seq("as", field("name", $.identifier))),
      ":",
      field("body", $.block),
    ),

    finally_clause: $ => seq(
      "finally",
      ":",
      field("body", $.block),
    ),

    assignment_statement: $ => seq(
      field("name", $.identifier),
      "=",
      field("value", $._expression),
    ),

    attribute_assignment_statement: $ => seq(
      field("target", $.member_expression),
      "=",
      field("value", $._expression),
    ),

    index_assignment_statement: $ => seq(
      field("target", $.subscript_expression),
      "=",
      field("value", $._expression),
    ),

    unsupported_statement: $ => seq(
      field("feature", choice("gpu", "memory")),
      optional(field("detail", $.raw_line_text)),
    ),

    raw_line_text: _ => token(/[^\n]+/),

    expression_statement: $ => $._expression,

    block: $ => seq(
      $.newline,
      $.indent,
      repeat(choice(
        $.newline,
        seq($._statement, optional($.newline)),
      )),
      $.dedent,
    ),

    type: $ => choice(
      prec.right(seq(
        field("base", choice($.builtin_type, $.identifier)),
        repeat(choice(
          $.type_suffix,
          "*",
        )),
      )),
      $.builtin_type,
      $.identifier,
    ),

    type_suffix: $ => seq(
      "[",
      optional(commaSep1($.type_argument)),
      "]",
    ),

    type_argument: $ => choice(
      $.type,
      $.integer_literal,
    ),

    _expression: $ => choice(
      $.range_expression,
      $.or_expression,
    ),

    range_expression: $ => prec.right(PREC.RANGE, seq(
      field("start", $.or_expression),
      "..",
      field("stop", $.or_expression),
    )),

    or_expression: $ => choice(
      $.and_expression,
      prec.left(PREC.OR, seq(
        field("left", $.or_expression),
        field("operator", choice("or", "||")),
        field("right", $.and_expression),
      )),
    ),

    and_expression: $ => choice(
      $.equality_expression,
      prec.left(PREC.AND, seq(
        field("left", $.and_expression),
        field("operator", choice("and", "&&")),
        field("right", $.equality_expression),
      )),
    ),

    equality_expression: $ => choice(
      $.comparison_expression,
      prec.left(PREC.EQUALITY, seq(
        field("left", $.equality_expression),
        field("operator", choice("==", "!=")),
        field("right", $.comparison_expression),
      )),
    ),

    comparison_expression: $ => choice(
      $.additive_expression,
      prec.left(PREC.COMPARISON, seq(
        field("left", $.comparison_expression),
        field("operator", choice("<", "<=", ">", ">=")),
        field("right", $.additive_expression),
      )),
    ),

    additive_expression: $ => choice(
      $.multiplicative_expression,
      prec.left(PREC.ADD, seq(
        field("left", $.additive_expression),
        field("operator", choice("+", "-")),
        field("right", $.multiplicative_expression),
      )),
    ),

    multiplicative_expression: $ => choice(
      $.unary_expression,
      prec.left(PREC.MUL, seq(
        field("left", $.multiplicative_expression),
        field("operator", choice("*", "/", "%")),
        field("right", $.unary_expression),
      )),
    ),

    unary_expression: $ => choice(
      prec.right(PREC.UNARY, seq(
        field("operator", choice("-", "!", "not")),
        field("argument", $.unary_expression),
      )),
      $.postfix_expression,
    ),

    postfix_expression: $ => choice(
      $.primary_expression,
      $.call_expression,
      $.member_expression,
      $.subscript_expression,
    ),

    call_expression: $ => prec.left(PREC.POSTFIX, seq(
      field("function", $.postfix_expression),
      "(",
      optional(commaSep($._expression)),
      ")",
    )),

    member_expression: $ => prec.left(PREC.POSTFIX, seq(
      field("value", $.postfix_expression),
      ".",
      field("property", $.identifier),
    )),

    subscript_expression: $ => prec.left(PREC.POSTFIX, seq(
      field("value", $.postfix_expression),
      "[",
      field("index", $._expression),
      "]",
    )),

    primary_expression: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.boolean_literal,
      $.none_literal,
      $.builtin_call_expression,
      $.syscall_expression,
      $.array_expression,
      $.map_expression,
      $.parenthesized_expression,
      $.identifier,
    ),

    builtin_call_expression: $ => seq(
      "type",
      "(",
      optional(commaSep($._expression)),
      ")",
    ),

    parenthesized_expression: $ => seq(
      "(",
      $._expression,
      ")",
    ),

    syscall_expression: $ => seq(
      "syscall",
      "(",
      field("target", $._expression),
      repeat(seq(",", $._expression)),
      ")",
    ),

    array_expression: $ => seq(
      "[",
      optional(commaSep($._expression)),
      "]",
    ),

    map_expression: $ => seq(
      "{",
      optional(commaSep($.map_entry)),
      "}",
    ),

    map_entry: $ => seq(
      field("key", $._expression),
      ":",
      field("value", $._expression),
    ),
  },
});

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)), optional(","));
}
