# Proposal to allow trailing commas in function parameter lists

In some codebases/style guides there are scenarios that arise where function calls and definitions are split across multiple lines in the style of:

```js
 1: function clownsEverywhere(
 2:   param1,
 3:   param2
 4: ) { /* ... */ }
 5: 
 6: clownsEverywhere(
 7:   'foo',
 8:   'bar'
 9: );
```

In these cases, when some other code contributer comes along and adds another parameter to one of these parameter lists, they must make two line updates:

```js
 1: function clownsEverywhere(
 2:   param1,
 3:   param2, // updated to add a comma
 4:   param3  // updated to add new parameter
 5: ) { /* ... */ }
 6: 
 7: clownsEverywhere(
 8:   'foo',
 9:   'bar', // updated to add a comma
10:   'baz'  // updated to add new parameter
11: );
```

In the process of doing this change on code managed by a version control system (git, subversion, mercurial, etc), the blame/annotation code history information for lines 3 and 9 get updated to point at the person who added the comma (rather than the person who originally added the parameter).

To help mitigate this problem, some other languages (Python, D, Hack, ...probably others...) have added grammar support to allow a trailing comma in these parameter lists. This allows code contributors to always end a parameter addition with a trialing comma in one of these per-line parameter lists and never have to worry about the code attribution problem again:

```js
 1: function clownsEverywhere(
 2:   param1,
 3:   param2, // Next parameter that's added only has to add a new line, not modify this line
 5: ) { /* ... */ }
 6: 
 7: clownsEverywhere(
 8:   'foo',
 9:   'bar', // Next parameter that's added only has to add a new line, not modify this line
11: );
```

This repo contains the proposal slides, a version of esprima hacked to allow trailing commas in parameter lists, and a very simple CLI utility to show that it's possible (and easy) to transpile trailing commas to ES5-compatible non-trailing commas in a build step.

For the CLI, you can either give it a single filename argument to read from disk, or you can pipe source text in to it.

## Spec Text

##### [14.1 Function Declarations](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-function-definitions)

[...]

_FormalParameterList_:<br />

&nbsp;&nbsp;_FunctionRestParameter_

_FormalsList_ :<br />

&nbsp;&nbsp;_FormalParameter_<br />
&nbsp;&nbsp;_FormalsList , _FormalParameter_<br />
&nbsp;&nbsp;**_FormalsList , _FormalParameter_ ,**<br />
&nbsp;&nbsp;_FormalsList , _FunctionRestParameter_<br />
 
##### [A.2 Expressions](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-expressions)

_CallExpression_ :<br />

&nbsp;&nbsp;_MemberExpression_ _Arguments_<br />
&nbsp;&nbsp;_SuperCall_<br />
&nbsp;&nbsp;_CallExpression_ _Arguments_<br />
&nbsp;&nbsp;_CallExpression_ [ _Expression_ ]<br />
&nbsp;&nbsp;_CallExpression_ . _IdentifierName_<br />
&nbsp;&nbsp;_CallExpression_ _TemplateLiteral_<br />

_ArgumentList_ :<br />

&nbsp;&nbsp;_AssignmentExpression_<br />
&nbsp;&nbsp;... _AssignmentExpression_<br />
&nbsp;&nbsp;_ArgumentList_ , _AssignmentExpression_<br />
&nbsp;&nbsp;**_ArgumentList_ , _AssignmentExpression_ ,**<br />
&nbsp;&nbsp;_ArgumentList_ , ... _AssignmentExpression_<br />
