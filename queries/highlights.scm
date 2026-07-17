(string_literal) @string
(agent (ident) @type)
((name) @variable.parameter
  (#is? local))
((name) @variable
  (#is-not? local))
"><" @operator
"~" @operator
[
  "free"
  "use"
  (otherwise)
] @keyword
(number) @number
(comment) @comment
(rule . (object (agent (ident) @function)))
