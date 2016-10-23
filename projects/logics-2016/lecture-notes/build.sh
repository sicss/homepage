#!/bin/bash

set -e
BASE_DIR="$(dirname "$0")"

(
    cd "$BASE_DIR"
    bundle exec jekyll build --drafts
    rm -rf _site/.git
    mkdir _site/.git

    ln -s ../../.git/{config,description,packed-refs,logs,hooks,info,objects,refs} _site/.git
    echo ref: refs/heads/master > _site/.git/HEAD
    cp .git/index _site/.git/

    cd _site
    git checkout -f pages
    git reset
    git add -A . && git commit -m "update" && git push git@gitlab.sicss.org:logics-2016/lecture-notes.git
)

