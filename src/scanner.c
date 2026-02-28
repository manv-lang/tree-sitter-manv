#include "tree_sitter/parser.h"

#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

/*
 * External scanner for ManV's indentation-sensitive syntax.
 *
 * Why this exists:
 * - The real frontend emits logical NEWLINE/INDENT/DEDENT tokens from leading
 *   whitespace, so the editor grammar needs the same mechanism.
 * - Tree-sitter regex rules cannot model Python-style indentation on their own.
 *
 * Important invariant:
 * - Once a line's indentation has been consumed, repeated DEDENT emissions must
 *   reuse the recorded indentation width for that line. Recomputing from the
 *   lexer would see zero spaces on the second pass and over-dedent nested code.
 */

enum TokenType {
  NEWLINE,
  INDENT,
  DEDENT,
};

typedef struct {
  uint16_t indents[128];
  uint8_t depth;
  uint8_t pending_dedents;
  bool at_line_start;
  bool has_pending_indent;
  uint16_t pending_indent;
} Scanner;

static void scanner_reset(Scanner *scanner) {
  scanner->indents[0] = 0;
  scanner->depth = 1;
  scanner->pending_dedents = 0;
  scanner->at_line_start = true;
  scanner->has_pending_indent = false;
  scanner->pending_indent = 0;
}

static void skip_comment(TSLexer *lexer) {
  while (lexer->lookahead != 0 && lexer->lookahead != '\n') {
    lexer->advance(lexer, true);
  }
}

void *tree_sitter_manv_external_scanner_create(void) {
  Scanner *scanner = (Scanner *)calloc(1, sizeof(Scanner));
  scanner_reset(scanner);
  return scanner;
}

void tree_sitter_manv_external_scanner_destroy(void *payload) {
  free(payload);
}

unsigned tree_sitter_manv_external_scanner_serialize(void *payload, char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  buffer[0] = (char)scanner->depth;
  buffer[1] = (char)scanner->pending_dedents;
  buffer[2] = scanner->at_line_start ? 1 : 0;
  buffer[3] = scanner->has_pending_indent ? 1 : 0;
  buffer[4] = (char)(scanner->pending_indent & 0xff);
  buffer[5] = (char)((scanner->pending_indent >> 8) & 0xff);

  unsigned size = 6;
  for (uint8_t index = 0; index < scanner->depth && size + 1 < TREE_SITTER_SERIALIZATION_BUFFER_SIZE; index++) {
    buffer[size++] = (char)(scanner->indents[index] & 0xff);
    buffer[size++] = (char)((scanner->indents[index] >> 8) & 0xff);
  }
  return size;
}

void tree_sitter_manv_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  scanner_reset(scanner);
  if (length < 6) {
    return;
  }

  scanner->depth = (uint8_t)buffer[0];
  if (scanner->depth == 0 || scanner->depth > 128) {
    scanner_reset(scanner);
    return;
  }

  scanner->pending_dedents = (uint8_t)buffer[1];
  scanner->at_line_start = buffer[2] != 0;
  scanner->has_pending_indent = buffer[3] != 0;
  scanner->pending_indent = (uint16_t)((unsigned char)buffer[4] | ((unsigned char)buffer[5] << 8));

  unsigned offset = 6;
  for (uint8_t index = 0; index < scanner->depth; index++) {
    if (offset + 1 >= length) {
      scanner_reset(scanner);
      return;
    }
    scanner->indents[index] = (uint16_t)((unsigned char)buffer[offset] | ((unsigned char)buffer[offset + 1] << 8));
    offset += 2;
  }
}

bool tree_sitter_manv_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  Scanner *scanner = (Scanner *)payload;

  if (scanner->pending_dedents > 0 && valid_symbols[DEDENT]) {
    scanner->pending_dedents--;
    lexer->result_symbol = DEDENT;
    return true;
  }

  while (lexer->lookahead == '\r') {
    lexer->advance(lexer, true);
  }

  if (lexer->lookahead == 0) {
    if (scanner->depth > 1 && valid_symbols[DEDENT]) {
      scanner->depth--;
      lexer->result_symbol = DEDENT;
      return true;
    }
    return false;
  }

  if (scanner->at_line_start) {
    if (!scanner->has_pending_indent) {
      uint16_t indent = 0;

      /*
       * We only measure indentation once per physical line. Blank/comment-only
       * lines become logical NEWLINE tokens and do not affect the indent stack.
       */
      while (true) {
        while (lexer->lookahead == ' ') {
          indent++;
          lexer->advance(lexer, true);
        }

        if (lexer->lookahead == '\t') {
          indent += 4;
          lexer->advance(lexer, true);
          continue;
        }

        while (lexer->lookahead == '\r') {
          lexer->advance(lexer, true);
        }

        if (lexer->lookahead == '#') {
          skip_comment(lexer);
          if (lexer->lookahead == '\n' && valid_symbols[NEWLINE]) {
            lexer->advance(lexer, true);
            scanner->at_line_start = true;
            scanner->has_pending_indent = false;
            lexer->result_symbol = NEWLINE;
            return true;
          }
        }
        break;
      }

      if (lexer->lookahead == '\n') {
        if (valid_symbols[NEWLINE]) {
          lexer->advance(lexer, true);
          scanner->at_line_start = true;
          scanner->has_pending_indent = false;
          lexer->result_symbol = NEWLINE;
          return true;
        }
        return false;
      }

      scanner->pending_indent = indent;
      scanner->has_pending_indent = true;
    }

    /*
     * Compare the recorded indentation against the active stack. The
     * `pending_indent` value stays live until the parser has consumed every
     * required DEDENT token for this line.
     */
    uint16_t indent = scanner->pending_indent;
    uint16_t current = scanner->indents[scanner->depth - 1];
    if (indent > current) {
      if (!valid_symbols[INDENT] || scanner->depth >= 128) {
        return false;
      }
      scanner->indents[scanner->depth++] = indent;
      scanner->has_pending_indent = false;
      scanner->at_line_start = false;
      lexer->result_symbol = INDENT;
      return true;
    }

    if (indent < current) {
      if (!valid_symbols[DEDENT]) {
        return false;
      }
      while (scanner->depth > 1 && indent < scanner->indents[scanner->depth - 1]) {
        scanner->depth--;
        scanner->pending_dedents++;
      }
      if (scanner->pending_dedents > 0) {
        scanner->pending_dedents--;
        lexer->result_symbol = DEDENT;
        return true;
      }
    }

    scanner->has_pending_indent = false;
    scanner->at_line_start = false;
    return false;
  }

  if (lexer->lookahead == '\n' && valid_symbols[NEWLINE]) {
    lexer->advance(lexer, true);
    scanner->at_line_start = true;
    lexer->result_symbol = NEWLINE;
    return true;
  }

  return false;
}
