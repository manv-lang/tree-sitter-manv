; Keywords
[
  "include"
  "from"
  "as"
  "use"
  "pub"
  "typedef"
  "fn"
  "struct"
  "impl"
  "constructor"
  "extern"
  "macro"
  "if"
  "else"
  "while"
  "for"
  "return"
  "break"
  "continue"
  "try"
  "except"
  "finally"
  "raise"
  "new"
  "syscall"
  "alignas"
  "extends"
  "sizeof"
] @keyword

; Builtin and generic type names
[
  "Option"
  "Result"
  "Map"
  "array"
  "gc"
  "arena_ref"
  "bytes"
  "arena"
] @type.builtin

(primitive_type) @type.builtin

; Declarations
(function_declaration name: (identifier) @function)
(method_declaration name: (identifier) @method)
(macro_declaration name: (identifier) @function.macro)
(struct_declaration name: (identifier) @type)
(typedef_declaration name: (identifier) @type)

; Calls and members
(call_expression function: (identifier) @function.call)
(method_call_expression method: (identifier) @method.call)
(member_expression property: (identifier) @property)

; Variables and params
(variable_declaration name: (identifier) @variable)
(parameter name: (identifier) @variable.parameter)
(struct_field name: (identifier) @property)

; Literals
(integer_literal) @number
(float_literal) @number.float
(string_literal) @string
(char_literal) @string.special
(boolean_literal) @boolean
(null_literal) @constant.builtin

; Comments
(comment) @comment

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "="
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "^="
  "<<="
  ">>="
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
  "&"
  "|"
  "^"
  "~"
  "<<"
  ">>"
  "++"
  "--"
  "?"
  "->"
] @operator

; Punctuation
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ";"
  ":"
  "."
] @punctuation.delimiter
