# Proposal to allow trailing commas in function parameter lists

In some codebases/style guides there are scenarios that arise where function calls and definitions are split across multiple lines in the style of:

```js
 1: function clownPuppiesEverywhere(
 2:   param1,
 3:   param2
 4: ) { /* ... */ }
 5: 
 6: clownPuppiesEverywhere(
 7:   'foo',
 8:   'bar'
 9: );
```

In these cases, when some other code contributor comes along and adds another parameter to one of these parameter lists, they must make two line updates:

```js
 1: function clownPuppiesEverywhere(
 2:   param1,
 3:   param2, // updated to add a comma
 4:   param3  // updated to add new parameter
 5: ) { /* ... */ }
 6: 
 7: clownPuppiesEverywhere(
 8:   'foo',
 9:   'bar', // updated to add a comma
10:   'baz'  // updated to add new parameter
11: );
```

In the process of doing this change on code managed by a version control system (git, subversion, mercurial, etc), the blame/annotation code history information for lines 3 and 9 get updated to point at the person who added the comma (rather than the person who originally added the parameter).

To help mitigate this problem, some other languages (Python, D, Hack, ...probably others...) have added grammar support to allow a trailing comma in these parameter lists. This allows code contributors to always end a parameter addition with a trailing comma in one of these per-line parameter lists and never have to worry about the code attribution problem again:

```js
 1: function clownPuppiesEverywhere(
 2:   param1,
 3:   param2, // Next parameter that's added only has to add a new line, not modify this line
 5: ) { /* ... */ }
 6: 
 7: clownPuppiesEverywhere(
 8:   'foo',
 9:   'bar', // Next parameter that's added only has to add a new line, not modify this line
11: );
```

Note that this proposal is exclusively about grammar and makes no changes to semantics, therefore the presence of a trailing comma has no effect on things like `<<function>>.length`.

This repo contains the proposal slides, a version of esprima hacked to allow trailing commas in parameter lists, and a very simple CLI utility to show that it's possible (and easy) to transpile trailing commas to ES5-compatible non-trailing commas in a build step.

For the CLI, you can either give it a single filename argument to read from disk, or you can pipe source text in to it.

## Spec Text

See [https://tc39.github.io/proposal-trailing-function-commas/](https://tc39.github.io/proposal-trailing-function-commas/)
