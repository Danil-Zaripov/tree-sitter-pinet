/**
 * @file Interaction nets programming language
 * @author Danil-Zaripov <danilzaripov@yahoo.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const binary_op = (prec_level, op, $) =>
  prec.left(prec_level, seq($.expression, op, $.expression));

export default grammar({
  name: "pinet",

  extras: ($) => [$.comment, /\s/],
  rules: {
    source_file: ($) => repeat($.stmt),
    ident: ($) => /[[:alpha:]_][a-zA-Z0-9'_]*/,
    name: ($) => alias($.ident, "name"),
    agent: ($) => seq(optional($.ident), "(", optional($.obj_list), ")"),
    list_cons: ($) => seq("[", optional($.obj_list), "]"),
    obj_list: ($) => seq($.object, repeat(seq(",", $.object))),
    object: ($) => choice($.name, $.agent, $.number, $.list_cons),
    name_list: ($) => seq($.name, repeat(seq(",", $.name))),
    active_pair: ($) => seq($.object, "~", $.object),
    aplist: ($) => seq($.active_pair, repeat(seq(",", $.active_pair))),
    rule_expression: ($) =>
      seq("|", choice($.otherwise, $.expression), "=>", optional($.aplist)),
    expression: ($) =>
      choice($.binary_expression, $.unary_expression, $.object),
    unary_expression: ($) => prec(10, seq("!", $.expression)),
    binary_expression: ($) =>
      choice(
        ...["==", "!=", "<=", ">=", ">", "<"].map((op) => binary_op(4, op, $)),
        binary_op(3, "&&", $),
        binary_op(2, "||", $),
      ),

    rule: ($) =>
      seq(
        $.object,
        "><",
        $.object,
        choice(repeat1($.rule_expression), seq("=>", $.aplist)),
      ),
    print_stmt: ($) => $.name,
    free_stmt: ($) => seq("free", optional($.name_list)),
    use_stmt: ($) => seq("use", $.string_literal),
    stmt: ($) =>
      seq(choice($.aplist, $.rule, $.print_stmt, $.free_stmt, $.use_stmt), ";"),
    otherwise: ($) => "otherwise",
    number: ($) => /\d+(\.\d+)?/,
    string_literal: ($) => seq('"', $.string_content, '"'),
    string_content: ($) => /(\\.|[^"\\])*/,
    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
