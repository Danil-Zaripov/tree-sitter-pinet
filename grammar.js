/**
 * @file Interaction nets programming language
 * @author Danil-Zaripov <danilzaripov@yahoo.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "pinet",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($.stmt),
    ident: ($) => /[[:alpha:]][a-zA-Z0-9']*/,
    name: ($) => alias($.ident, "name"),
    agent: ($) => seq($.ident, "(", optional($.arg_list), ")"),
    value: ($) => choice($.name, $.agent),
    arg_list: ($) => seq($.value, repeat(seq(",", $.value))),
    active_pair: ($) => seq($.value, "~", $.value),
    aplist: ($) => seq($.active_pair, repeat(seq(",", $.active_pair))),
    rule: ($) => seq($.value, "><", $.value, "=>", optional($.aplist)),
    print_stmt: ($) => $.name,
    stmt: ($) => seq(choice($.aplist, $.rule, $.print_stmt), ";"),
  },
});
