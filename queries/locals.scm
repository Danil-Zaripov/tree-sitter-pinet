(rule) @local.scope

; Definitions from the rule header: left object and right object.
(rule
  .
  (object (name) @local.definition))

(rule
  .
  (object
    (agent
      (obj_list
        (object (name) @local.definition)))))

(rule
  (object)
  .
  (object (name) @local.definition))

(rule
  (object)
  .
  (object
    (agent
      (obj_list
        (object (name) @local.definition)))))

; References can appear in conditions and in the rule body.
(rule_expression
  (expression (object (name) @local.reference)))

(rule_expression
  (expression
    (unary_expression
      (expression (object (name) @local.reference)))))

(rule_expression
  (expression
    (binary_expression
      (expression (object (name) @local.reference)))))

(rule_expression
  body: (aplist
    (active_pair
      (object (name) @local.reference))))

(rule_expression
  body: (aplist
    (active_pair
      (object
        (agent
          (obj_list
            (object (name) @local.reference)))))))

(rule
  body: (aplist
    (active_pair
      (object (name) @local.reference))))

(rule
  body: (aplist
    (active_pair
      (object
        (agent
          (obj_list
            (object (name) @local.reference)))))))
