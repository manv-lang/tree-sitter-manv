#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 19
#define LARGE_STATE_COUNT 4
#define SYMBOL_COUNT 23
#define ALIAS_COUNT 0
#define TOKEN_COUNT 14
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 3
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_mul = 1,
  anon_sym_div = 2,
  anon_sym_add = 3,
  anon_sym_sub = 4,
  anon_sym_const = 5,
  anon_sym_var = 6,
  anon_sym_fn = 7,
  anon_sym_COMMA = 8,
  anon_sym_SEMI = 9,
  aux_sym_comment_token1 = 10,
  sym_identifier = 11,
  sym_number = 12,
  sym__whitespace = 13,
  sym_source_file = 14,
  sym__statement = 15,
  sym_instruction = 16,
  sym_opcode = 17,
  sym_operand_list = 18,
  sym_operand = 19,
  sym_comment = 20,
  aux_sym_source_file_repeat1 = 21,
  aux_sym_operand_list_repeat1 = 22,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_mul] = "mul",
  [anon_sym_div] = "div",
  [anon_sym_add] = "add",
  [anon_sym_sub] = "sub",
  [anon_sym_const] = "const",
  [anon_sym_var] = "var",
  [anon_sym_fn] = "fn",
  [anon_sym_COMMA] = ",",
  [anon_sym_SEMI] = ";",
  [aux_sym_comment_token1] = "comment_token1",
  [sym_identifier] = "identifier",
  [sym_number] = "number",
  [sym__whitespace] = "_whitespace",
  [sym_source_file] = "source_file",
  [sym__statement] = "_statement",
  [sym_instruction] = "instruction",
  [sym_opcode] = "opcode",
  [sym_operand_list] = "operand_list",
  [sym_operand] = "operand",
  [sym_comment] = "comment",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_operand_list_repeat1] = "operand_list_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_mul] = anon_sym_mul,
  [anon_sym_div] = anon_sym_div,
  [anon_sym_add] = anon_sym_add,
  [anon_sym_sub] = anon_sym_sub,
  [anon_sym_const] = anon_sym_const,
  [anon_sym_var] = anon_sym_var,
  [anon_sym_fn] = anon_sym_fn,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_SEMI] = anon_sym_SEMI,
  [aux_sym_comment_token1] = aux_sym_comment_token1,
  [sym_identifier] = sym_identifier,
  [sym_number] = sym_number,
  [sym__whitespace] = sym__whitespace,
  [sym_source_file] = sym_source_file,
  [sym__statement] = sym__statement,
  [sym_instruction] = sym_instruction,
  [sym_opcode] = sym_opcode,
  [sym_operand_list] = sym_operand_list,
  [sym_operand] = sym_operand,
  [sym_comment] = sym_comment,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_operand_list_repeat1] = aux_sym_operand_list_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_mul] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_div] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_add] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_sub] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_const] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_var] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_fn] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_SEMI] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_comment_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [sym_number] = {
    .visible = true,
    .named = true,
  },
  [sym__whitespace] = {
    .visible = false,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym__statement] = {
    .visible = false,
    .named = true,
  },
  [sym_instruction] = {
    .visible = true,
    .named = true,
  },
  [sym_opcode] = {
    .visible = true,
    .named = true,
  },
  [sym_operand_list] = {
    .visible = true,
    .named = true,
  },
  [sym_operand] = {
    .visible = true,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_operand_list_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(18);
      if (lookahead == ',') ADVANCE(26);
      if (lookahead == ';') ADVANCE(27);
      if (lookahead == 'a') ADVANCE(4);
      if (lookahead == 'c') ADVANCE(9);
      if (lookahead == 'd') ADVANCE(5);
      if (lookahead == 'f') ADVANCE(7);
      if (lookahead == 'm') ADVANCE(13);
      if (lookahead == 's') ADVANCE(14);
      if (lookahead == 'v') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(31);
      END_STATE();
    case 1:
      if (lookahead == 'a') ADVANCE(10);
      END_STATE();
    case 2:
      if (lookahead == 'b') ADVANCE(22);
      END_STATE();
    case 3:
      if (lookahead == 'd') ADVANCE(21);
      END_STATE();
    case 4:
      if (lookahead == 'd') ADVANCE(3);
      END_STATE();
    case 5:
      if (lookahead == 'i') ADVANCE(15);
      END_STATE();
    case 6:
      if (lookahead == 'l') ADVANCE(19);
      END_STATE();
    case 7:
      if (lookahead == 'n') ADVANCE(25);
      END_STATE();
    case 8:
      if (lookahead == 'n') ADVANCE(11);
      END_STATE();
    case 9:
      if (lookahead == 'o') ADVANCE(8);
      END_STATE();
    case 10:
      if (lookahead == 'r') ADVANCE(24);
      END_STATE();
    case 11:
      if (lookahead == 's') ADVANCE(12);
      END_STATE();
    case 12:
      if (lookahead == 't') ADVANCE(23);
      END_STATE();
    case 13:
      if (lookahead == 'u') ADVANCE(6);
      END_STATE();
    case 14:
      if (lookahead == 'u') ADVANCE(2);
      END_STATE();
    case 15:
      if (lookahead == 'v') ADVANCE(20);
      END_STATE();
    case 16:
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(16)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(31);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(30);
      END_STATE();
    case 17:
      if (eof) ADVANCE(18);
      if (lookahead == ';') ADVANCE(27);
      if (lookahead == 'a') ADVANCE(4);
      if (lookahead == 'c') ADVANCE(9);
      if (lookahead == 'd') ADVANCE(5);
      if (lookahead == 'f') ADVANCE(7);
      if (lookahead == 'm') ADVANCE(13);
      if (lookahead == 's') ADVANCE(14);
      if (lookahead == 'v') ADVANCE(1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(32);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_mul);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_div);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_add);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_sub);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_const);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_var);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_fn);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_SEMI);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_comment_token1);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(28);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(29);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(aux_sym_comment_token1);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(29);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(30);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(sym_number);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(31);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(sym__whitespace);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(32);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 17},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 17},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 16},
  [16] = {.lex_state = 16},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 28},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_mul] = ACTIONS(1),
    [anon_sym_div] = ACTIONS(1),
    [anon_sym_add] = ACTIONS(1),
    [anon_sym_sub] = ACTIONS(1),
    [anon_sym_const] = ACTIONS(1),
    [anon_sym_var] = ACTIONS(1),
    [anon_sym_fn] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_SEMI] = ACTIONS(1),
    [sym_number] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(17),
    [sym__statement] = STATE(2),
    [sym_instruction] = STATE(8),
    [sym_opcode] = STATE(9),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_mul] = ACTIONS(5),
    [anon_sym_div] = ACTIONS(5),
    [anon_sym_add] = ACTIONS(5),
    [anon_sym_sub] = ACTIONS(5),
    [anon_sym_const] = ACTIONS(5),
    [anon_sym_var] = ACTIONS(5),
    [anon_sym_fn] = ACTIONS(5),
  },
  [2] = {
    [sym__statement] = STATE(3),
    [sym_instruction] = STATE(8),
    [sym_opcode] = STATE(9),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(7),
    [anon_sym_mul] = ACTIONS(5),
    [anon_sym_div] = ACTIONS(5),
    [anon_sym_add] = ACTIONS(5),
    [anon_sym_sub] = ACTIONS(5),
    [anon_sym_const] = ACTIONS(5),
    [anon_sym_var] = ACTIONS(5),
    [anon_sym_fn] = ACTIONS(5),
  },
  [3] = {
    [sym__statement] = STATE(3),
    [sym_instruction] = STATE(8),
    [sym_opcode] = STATE(9),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(9),
    [anon_sym_mul] = ACTIONS(11),
    [anon_sym_div] = ACTIONS(11),
    [anon_sym_add] = ACTIONS(11),
    [anon_sym_sub] = ACTIONS(11),
    [anon_sym_const] = ACTIONS(11),
    [anon_sym_var] = ACTIONS(11),
    [anon_sym_fn] = ACTIONS(11),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 3,
    ACTIONS(16), 1,
      anon_sym_COMMA,
    STATE(5), 1,
      aux_sym_operand_list_repeat1,
    ACTIONS(14), 9,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [18] = 3,
    ACTIONS(16), 1,
      anon_sym_COMMA,
    STATE(6), 1,
      aux_sym_operand_list_repeat1,
    ACTIONS(18), 9,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [36] = 3,
    ACTIONS(22), 1,
      anon_sym_COMMA,
    STATE(6), 1,
      aux_sym_operand_list_repeat1,
    ACTIONS(20), 9,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [54] = 2,
    ACTIONS(25), 2,
      ts_builtin_sym_end,
      sym__whitespace,
    ACTIONS(27), 8,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [69] = 3,
    ACTIONS(31), 1,
      anon_sym_SEMI,
    STATE(13), 1,
      sym_comment,
    ACTIONS(29), 8,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
  [86] = 3,
    ACTIONS(33), 1,
      ts_builtin_sym_end,
    ACTIONS(37), 1,
      sym__whitespace,
    ACTIONS(35), 8,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [103] = 1,
    ACTIONS(39), 10,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_COMMA,
      anon_sym_SEMI,
  [116] = 1,
    ACTIONS(20), 10,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_COMMA,
      anon_sym_SEMI,
  [129] = 1,
    ACTIONS(41), 9,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
      anon_sym_SEMI,
  [141] = 1,
    ACTIONS(43), 8,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
  [152] = 1,
    ACTIONS(45), 8,
      ts_builtin_sym_end,
      anon_sym_mul,
      anon_sym_div,
      anon_sym_add,
      anon_sym_sub,
      anon_sym_const,
      anon_sym_var,
      anon_sym_fn,
  [163] = 3,
    STATE(4), 1,
      sym_operand,
    STATE(12), 1,
      sym_operand_list,
    ACTIONS(47), 2,
      sym_identifier,
      sym_number,
  [174] = 2,
    STATE(11), 1,
      sym_operand,
    ACTIONS(47), 2,
      sym_identifier,
      sym_number,
  [182] = 1,
    ACTIONS(49), 1,
      ts_builtin_sym_end,
  [186] = 1,
    ACTIONS(51), 1,
      aux_sym_comment_token1,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(4)] = 0,
  [SMALL_STATE(5)] = 18,
  [SMALL_STATE(6)] = 36,
  [SMALL_STATE(7)] = 54,
  [SMALL_STATE(8)] = 69,
  [SMALL_STATE(9)] = 86,
  [SMALL_STATE(10)] = 103,
  [SMALL_STATE(11)] = 116,
  [SMALL_STATE(12)] = 129,
  [SMALL_STATE(13)] = 141,
  [SMALL_STATE(14)] = 152,
  [SMALL_STATE(15)] = 163,
  [SMALL_STATE(16)] = 174,
  [SMALL_STATE(17)] = 182,
  [SMALL_STATE(18)] = 186,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [7] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [11] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(7),
  [14] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_operand_list, 1),
  [16] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [18] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_operand_list, 2),
  [20] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_operand_list_repeat1, 2),
  [22] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_operand_list_repeat1, 2), SHIFT_REPEAT(16),
  [25] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_opcode, 1),
  [27] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_opcode, 1),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__statement, 1),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [33] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instruction, 1),
  [35] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_instruction, 1),
  [37] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_operand, 1),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_instruction, 3),
  [43] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__statement, 2),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 2),
  [47] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [49] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [51] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_manv(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
