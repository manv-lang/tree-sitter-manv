; Tree-sitter syntax highlighting for ManV
; 
; Highlighting queries for the ManV programming language.

; ============================================================================
; Keywords
; ============================================================================

; Control flow keywords
[
  "if"
  "else"
  "while"
  "for"
  "return"
  "break"
  "continue"
] @keyword.control

; Declaration keywords
[
  "fn"
  "struct"
  "typedef"
  "const"
  "extern"
  "include"
  "from"
  "as"
] @keyword.declaration

; Special keywords
[
  "syscall"
  "sizeof"
  "alignas"
] @keyword.special

; ============================================================================
; Types
; ============================================================================

; Primitive types
(primitive_type) @type.builtin

; Type identifiers (struct names, typedef names)
(type) @type

; Generic type parameters
(array_type "<" @punctuation.bracket)
(array_type ">" @punctuation.bracket)
(array_type "," @punctuation.delimiter)

; ============================================================================
; Functions
; ============================================================================

; Function declaration name
(function_declaration
  name: (identifier) @function)

; Function call
(call_expression
  function: (identifier) @function.call)

; Method call
(method_call_expression
  method: (identifier) @method.call)

; Function parameters
(parameter
  name: (identifier) @variable.parameter)

; ============================================================================
; Variables
; ============================================================================

; Variable declarations
(variable_declaration
  name: (identifier) @variable)

; Constant declarations
(constant_declaration
  name: (identifier) @constant)

; Struct fields
(struct_field
  name: (identifier) @variable.member)

; Member access
(member_expression
  property: (identifier) @variable.member)

; ============================================================================
; Literals
; ============================================================================

(integer_literal) @constant.numeric.integer
(float_literal) @constant.numeric.float
(string_literal) @string
(char_literal) @constant.character
(boolean_literal) @constant.builtin.boolean
(null_literal) @constant.builtin

; ============================================================================
; Comments
; ============================================================================

(comment) @comment

; ============================================================================
; Operators
; ============================================================================

; Binary operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
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
] @operator

; Assignment operators
[
  "="
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "^="
] @operator

; Increment/decrement
[
  "++"
  "--"
] @operator

; ============================================================================
; Punctuation
; ============================================================================

; Brackets
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

; Delimiters
[
  ","
  ";"
  ":"
  "."
  "->"
] @punctuation.delimiter

; ============================================================================
; Special
; ============================================================================

; Address-of operator
(addressof_expression
  "&" @operator)

; Dereference operator
(dereference_expression
  "*" @operator)

; Pointer type
(pointer_type
  "*" @operator)

; Reference parameter
(parameter
  "&" @operator)

; Type cast
(cast_expression
  "(" @punctuation.bracket
  type: (type) @type
  ")" @punctuation.bracket)

; Option type
(option_type
  "Option" @type.builtin)

; GC type
(gc_type
  "gc" @type.builtin)

; Arena types
(arena_type) @type.builtin
(arena_ref_type
  "arena_ref" @type.builtin)

; Include statement
(import_statement
  (string_literal) @string.special.path)

(import_statement
  "from" @keyword.declaration)

(import_statement
  "as" @keyword.declaration)

; Syscall statement
(syscall_statement
  "syscall" @keyword.special)