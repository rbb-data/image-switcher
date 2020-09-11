#!/usr/bin/env bash

SERVER_PATH="$1"
PUBLIC_URL=https://dj1.app.rbb-cloud.de/image-sliders/$SERVER_PATH npx run-s build "deploy $SERVER_PATH"

# well, that's bash ¯\_(ツ)_/¯
# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo ''
echo '-------------------------------------------------------------------'
echo ''
echo 'You can embed the slider in an article using the following snippet:'
echo ''
$SCRIPT_DIR/embed-code.sh $SERVER_PATH
echo ''

