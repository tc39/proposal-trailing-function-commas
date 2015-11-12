#!/bin/sh
set -x

node node_modules/ecmarkup/bin/ecmarkup.js spec/index.htm index.htm.tmp --css ecmarkup.css.tmp --js ecmarkup.js.tmp \
  && git checkout gh-pages \
  && mv index.htm.tmp index.htm \
  && mv ecmarkup.css.tmp ecmarkup.css \
  && mv ecmarkup.js.tmp ecmarkup.js \
  && git commit -a -m "update gh-pages"
