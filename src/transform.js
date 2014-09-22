var esprima = require('./esprima');
var recast = require('recast');

function transformAST(node) {
  // Aha! There's no telling, from a raw AST, that a trailing comma exists.
  // So we don't really need to do anything here. The Recast pretty-printer will
  // skip trailing commas for us!
  return node;
}

function transformSource(source) {
  var astRoot = esprima.parse(source, {
    loc: true,
    comment: true
  });
  var transformedAST = transformAST(astRoot);
  return recast.print(transformedAST).code;
}

exports.transformAST = transformAST;
exports.transformSource = transformSource;
