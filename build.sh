#!/bin/bash

if ! [ -x "$(command -v brew)" ]; then
  echo 'Error: brew is not installed.' >&2
  echo 'Go here: https://brew.sh' >&2
  exit 1
fi

brew tap homebrew/bundle
brew bundle

dot -Tpng siteplan.dot > siteplan.png
