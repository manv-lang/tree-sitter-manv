(decorator
  name: (identifier) @attribute)

(function_declaration) @keyword
(function_declaration
  name: (identifier) @function)

(type_declaration) @keyword
(type_declaration
  name: (identifier) @type)

(impl_declaration) @keyword
(impl_declaration
  target: (identifier) @type)

(macro_declaration) @keyword
(macro_declaration
  name: (identifier) @function.macro)

(import_statement) @keyword
(from_import_statement) @keyword

(let_statement) @keyword
(let_statement
  name: (identifier) @variable)

(typed_variable_statement
  name: (identifier) @variable)

(parameter
  name: (identifier) @variable.parameter)

(keyword_argument
  name: (identifier) @property)

(if_statement) @keyword
(else_clause) @keyword
(while_statement) @keyword
(for_statement) @keyword
(try_statement) @keyword
(except_clause) @keyword
(finally_clause) @keyword
(return_statement) @keyword
(return_with_value_statement) @keyword
(raise_statement) @keyword
(raise_with_value_statement) @keyword
(break_statement) @keyword
(continue_statement) @keyword

(builtin_type) @type.builtin

(builtin_call_expression) @type.builtin

(module_segment) @namespace

(member_expression
  property: (identifier) @property)

(integer_literal) @number
(float_literal) @number.float
(string_literal) @string
(boolean_literal) @boolean
(none_literal) @constant.builtin
(comment) @comment
