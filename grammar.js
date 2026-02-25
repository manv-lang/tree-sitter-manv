const PREC = {
  TERNARY: 1,
  OR: 2,
  AND: 3,
  BIT_OR: 4,
  BIT_XOR: 5,
  BIT_AND: 6,
  EQUALITY: 7,
  COMPARISON: 8,
  SHIFT: 9,
  ADD: 10,
  MUL: 11,
  UNARY: 12,
  CALL: 13,
};

module.exports = grammar({
  name: "manv",

  extras: $ => [
    $.comment,
    /\s/,
  ],

  conflicts: $ => [
    [$.type_atom, $.primary_expression],
    [$.generic_type, $.primary_expression],
  ],

  rules: {
    source_file: $ => repeat(choice(
      $.import_statement,
      $.use_declaration,
      $.pub_use_declaration,
      $.typedef_declaration,
      $.struct_declaration,
      $.impl_declaration,
      $.extern_declaration,
      $.function_declaration,
      $.macro_declaration,
      $.variable_declaration
    )),

    comment: $ => token(choice(
      seq("//", /.*/),
      seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")
    )),

    integer_literal: $ => token(choice(
      /[0-9]+/,
      seq("0x", /[0-9a-fA-F]+/),
      seq("0b", /[01]+/),
      seq("0o", /[0-7]+/)
    )),

    float_literal: $ => token(choice(
      seq(/[0-9]+\.[0-9]+/, optional(/[eE][+-]?[0-9]+/)),
      seq(/[0-9]+/, /[eE][+-]?[0-9]+/)
    )),

    string_literal: $ => token(seq(
      '"',
      repeat(choice(/[^"\\]+/, seq("\\", /./))),
      '"'
    )),

    char_literal: $ => token(seq(
      "'",
      choice(/[^'\\]/, seq("\\", /./)),
      "'"
    )),

    boolean_literal: $ => choice("true", "false"),
    null_literal: $ => "null",

    array_literal: $ => seq("[", commaSep($.expression), "]"),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    primitive_type: $ => choice(
      "i8", "i16", "i32", "i64", "i128",
      "u8", "u16", "u32", "u64", "u128",
      "isize", "usize",
      "f32", "f64",
      "int", "uint", "byte", "float",
      "bool", "char", "str", "void", "arena"
    ),

    type: $ => choice(
      $.pointer_type,
      $.type_atom
    ),

    type_atom: $ => choice(
      $.primitive_type,
      $.array_type,
      $.generic_type,
      $.option_type,
      $.result_type,
      $.map_type,
      $.gc_type,
      $.arena_ref_type,
      $.bytes_type,
      $.identifier
    ),

    pointer_type: $ => seq(
      $.type_atom,
      repeat1("*")
    ),

    array_type: $ => seq(
      "array",
      "<",
      $.type,
      optional(seq(",", choice($.integer_literal, $.identifier))),
      ">"
    ),

    generic_type: $ => seq(
      $.identifier,
      "<",
      commaSep1($.type),
      ">"
    ),

    option_type: $ => seq("Option", "<", $.type, ">"),
    result_type: $ => seq("Result", "<", $.type, ",", $.type, ">"),
    map_type: $ => seq("Map", "<", $.type, ",", $.type, ">"),
    gc_type: $ => seq("gc", "<", $.type, ">"),
    arena_ref_type: $ => seq("arena_ref", "<", $.type, ">"),
    bytes_type: $ => seq("bytes", optional(seq("<", $.integer_literal, ">"))),

    import_statement: $ => seq(
      "include",
      choice(
        seq($.string_literal, optional(seq("as", field("alias", $.identifier)))),
        seq(
          field("symbol", $.identifier),
          "from",
          field("path", $.string_literal),
          optional(seq("as", field("alias", $.identifier)))
        )
      ),
      ";"
    ),

    use_declaration: $ => seq(
      "use",
      choice($.identifier, $.string_literal),
      ";"
    ),

    pub_use_declaration: $ => seq(
      "pub",
      "use",
      field("module", $.identifier),
      ":",
      choice(
        "*",
        commaSep1($.reexport_symbol)
      ),
      ";"
    ),

    reexport_symbol: $ => seq(
      field("name", $.identifier),
      optional(seq("as", field("alias", $.identifier)))
    ),

    function_declaration: $ => seq(
      "fn",
      field("name", $.identifier),
      optional($.generic_parameter_list),
      "(",
      commaSep($.parameter),
      ")",
      optional(seq("->", $.type)),
      choice(";", $.block)
    ),

    generic_parameter_list: $ => seq(
      "<",
      commaSep1($.identifier),
      ">"
    ),

    parameter: $ => choice(
      seq(field("type", $.type), optional("&"), field("name", $.identifier)),
      seq(field("name", $.identifier), ":", field("type", $.type))
    ),

    struct_declaration: $ => seq(
      "struct",
      optional($.alignas_attribute),
      field("name", $.identifier),
      optional(seq("extends", $.type)),
      "{",
      repeat($.struct_field),
      "}"
    ),

    struct_field: $ => seq(
      field("name", $.identifier),
      ":",
      field("type", $.type),
      ";"
    ),

    alignas_attribute: $ => seq(
      "alignas",
      "(",
      $.integer_literal,
      ")"
    ),

    typedef_declaration: $ => choice(
      seq(
        "typedef",
        field("name", $.identifier),
        "=",
        field("aliased_type", $.type),
        ";"
      ),
      seq(
        "typedef",
        field("aliased_type", $.type),
        field("name", $.identifier),
        ";"
      )
    ),

    variable_declaration: $ => seq(
      field("type", $.type),
      field("name", $.identifier),
      optional(seq("=", field("value", $.expression))),
      ";"
    ),

    extern_declaration: $ => seq(
      "extern",
      choice(
        $.function_declaration,
        $.variable_declaration
      )
    ),

    impl_declaration: $ => seq(
      "impl",
      field("target", $.type),
      "{",
      repeat(choice(
        $.constructor_declaration,
        $.method_declaration
      )),
      "}"
    ),

    constructor_declaration: $ => seq(
      "constructor",
      "(",
      commaSep($.parameter),
      ")",
      $.block
    ),

    method_declaration: $ => seq(
      "fn",
      field("name", $.identifier),
      optional($.generic_parameter_list),
      "(",
      commaSep($.method_parameter),
      ")",
      optional(seq("->", $.type)),
      choice(";", $.block)
    ),

    method_parameter: $ => choice(
      "self",
      seq("self", "&"),
      $.parameter
    ),

    macro_declaration: $ => seq(
      "macro",
      field("name", $.identifier),
      "(",
      commaSep($.macro_parameter),
      ")",
      $.block
    ),

    macro_parameter: $ => choice(
      $.identifier,
      seq("$", $.identifier)
    ),

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
      $.break_statement,
      $.continue_statement,
      $.syscall_statement,
      $.try_statement,
      $.raise_statement,
      $.block
    ),

    assignment_statement: $ => seq(
      $.expression,
      choice("=", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<=", ">>="),
      $.expression,
      ";"
    ),

    expression_statement: $ => seq(
      $.expression,
      ";"
    ),

    if_statement: $ => seq(
      "if",
      "(",
      $.expression,
      ")",
      $.block,
      optional(seq(
        "else",
        $.block
      ))
    ),

    while_statement: $ => seq(
      "while",
      "(",
      $.expression,
      ")",
      $.block
    ),

    for_statement: $ => seq(
      "for",
      "(",
      optional($.for_initializer),
      ";",
      optional($.expression),
      ";",
      optional($.expression),
      ")",
      $.block
    ),

    for_initializer: $ => choice(
      $.for_variable_declaration,
      $.expression
    ),

    for_variable_declaration: $ => seq(
      field("type", $.type),
      field("name", $.identifier),
      optional(seq("=", $.expression))
    ),

    return_statement: $ => seq(
      "return",
      optional($.expression),
      ";"
    ),

    break_statement: $ => seq("break", ";"),
    continue_statement: $ => seq("continue", ";"),

    syscall_statement: $ => seq(
      "syscall",
      $.expression,
      repeat(seq(",", $.expression)),
      ";"
    ),

    try_statement: $ => seq(
      "try",
      $.block,
      repeat1($.except_clause),
      optional($.finally_clause)
    ),

    except_clause: $ => seq(
      "except",
      optional(seq($.identifier, "as", $.identifier)),
      $.block
    ),

    finally_clause: $ => seq(
      "finally",
      $.block
    ),

    raise_statement: $ => seq(
      "raise",
      optional($.expression),
      ";"
    ),

    expression: $ => choice(
      $.ternary_expression,
      $.binary_expression,
      $.unary_expression,
      $.new_expression,
      $.call_expression,
      $.method_call_expression,
      $.member_expression,
      $.index_expression,
      $.cast_expression,
      $.sizeof_expression,
      $.parenthesized_expression,
      $.primary_expression
    ),

    ternary_expression: $ => prec.right(PREC.TERNARY, seq(
      $.expression,
      "?",
      $.expression,
      ":",
      $.expression
    )),

    binary_expression: $ => choice(
      prec.left(PREC.OR, seq($.expression, "||", $.expression)),
      prec.left(PREC.AND, seq($.expression, "&&", $.expression)),
      prec.left(PREC.BIT_OR, seq($.expression, "|", $.expression)),
      prec.left(PREC.BIT_XOR, seq($.expression, "^", $.expression)),
      prec.left(PREC.BIT_AND, seq($.expression, "&", $.expression)),
      prec.left(PREC.EQUALITY, seq($.expression, "==", $.expression)),
      prec.left(PREC.EQUALITY, seq($.expression, "!=", $.expression)),
      prec.left(PREC.COMPARISON, seq($.expression, "<", $.expression)),
      prec.left(PREC.COMPARISON, seq($.expression, "<=", $.expression)),
      prec.left(PREC.COMPARISON, seq($.expression, ">", $.expression)),
      prec.left(PREC.COMPARISON, seq($.expression, ">=", $.expression)),
      prec.left(PREC.SHIFT, seq($.expression, "<<", $.expression)),
      prec.left(PREC.SHIFT, seq($.expression, ">>", $.expression)),
      prec.left(PREC.ADD, seq($.expression, "+", $.expression)),
      prec.left(PREC.ADD, seq($.expression, "-", $.expression)),
      prec.left(PREC.MUL, seq($.expression, "*", $.expression)),
      prec.left(PREC.MUL, seq($.expression, "/", $.expression)),
      prec.left(PREC.MUL, seq($.expression, "%", $.expression))
    ),

    unary_expression: $ => choice(
      prec(PREC.UNARY, seq("-", $.expression)),
      prec(PREC.UNARY, seq("+", $.expression)),
      prec(PREC.UNARY, seq("!", $.expression)),
      prec(PREC.UNARY, seq("~", $.expression)),
      prec(PREC.UNARY, seq("&", $.expression)),
      prec(PREC.UNARY, seq("*", $.expression)),
      prec(PREC.UNARY, seq("--", $.expression)),
      prec(PREC.UNARY, seq("++", $.expression))
    ),

    new_expression: $ => seq(
      "new",
      $.type,
      "(",
      commaSep($.expression),
      ")"
    ),

    call_expression: $ => prec.left(PREC.CALL, seq(
      field("function", $.expression),
      "(",
      commaSep($.expression),
      ")"
    )),

    method_call_expression: $ => prec.left(PREC.CALL, seq(
      field("receiver", $.expression),
      ".",
      field("method", $.identifier),
      "(",
      commaSep($.expression),
      ")"
    )),

    member_expression: $ => prec.left(PREC.CALL, seq(
      field("object", $.expression),
      ".",
      field("property", $.identifier)
    )),

    index_expression: $ => prec.left(PREC.CALL, seq(
      field("array", $.expression),
      "[",
      field("index", $.expression),
      "]"
    )),

    cast_expression: $ => prec.left(PREC.UNARY, seq(
      "(",
      $.type,
      ")",
      $.expression
    )),

    sizeof_expression: $ => seq(
      "sizeof",
      choice(
        seq("(", $.type, ")"),
        $.expression
      )
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
      "self",
      $.identifier
    ),
  },
});

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}
