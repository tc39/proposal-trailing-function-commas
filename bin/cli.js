#!/usr/bin/env node

var commander = require('commander');
var fs = require('fs');
var path = require('path');
var q = require('q');
var transform = require('../src/transform');

var Promise = q.Promise;

var PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'package.json');

function _normalizeArgv(argv) {
  argv = new commander.Command()
    .version(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'))
    .parse(argv);

  if (argv.args.length > 1) {
    throw new Error(
      'Multiple arguments passed, not sure what to do? Please pass either a ' +
      'single file path to read from disk, or pass data in through stdin.'
    );
  } else if (argv.args.length === 1) {
    var stat = fs.statSync(argv.args[0]);
    if (stat.isDirectory()) {
      throw new Error(
        'It seems you passed a directory path. Dunno what I\'m supposed to ' +
        'do with a directory...'
      );
    }
  }

  return argv;
}

function _readSourceFromStdin() {
  return new Promise(function(resolve, reject) {
    var sourceText = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(chunk) {
      sourceText += chunk;
    });
    process.stdin.on('end', function() {
      resolve(sourceText);
    });
    process.stdin.on('error', function(err) {
      reject(err);
    });
  });
}

function runCLI(argv) {
  argv = _normalizeArgv(argv);

  var source =
    argv.args.length === 1
    ? q.nfcall(fs.readFile, argv.args[0], 'utf8')
    : _readSourceFromStdin();

  return source.then(transform.transformSource);
}

exports.transformAST = transform.transformAST;
exports.transformSource = transform.transformSource;
exports.runCLI = runCLI;

if (require.main === module) {
  runCLI(process.argv).done(function(result) {
    console.log(result);
  });
}
