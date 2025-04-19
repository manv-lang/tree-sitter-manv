module.exports = grammar({
    name: "manv",
  
    rules: {
      source_file: $ => repeat($._statement),
  
      _statement: $ => seq(
        $.instruction,
        optional($.comment)
      ),
  
      instruction: $ => seq(
        $.opcode,
        optional(seq(
          $._whitespace,
          $.operand_list
        ))
      ),
  
      opcode: $ => choice(
        "mul", "div", "add", "sub", "const", "var", "fn"
      ),
  
      operand_list: $ => seq(
        $.operand,
        repeat(seq(",", $.operand))
      ),
  
      operand: $ => choice(
        $.identifier,
        $.number
      ),
  
      comment: $ => seq("//", /.*/),
  
      identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  
      number: $ => /\d+/,
  
      _whitespace: _ => /\s+/
    }
  });