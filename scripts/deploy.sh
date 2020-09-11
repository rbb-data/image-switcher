#!/usr/bin/env bash

SERVER_PATH="$1"
rsync -sr --info=progress2  --rsync-path="cd /var/www/image-sliders && sudo -u dokku mkdir -p $SERVER_PATH && sudo -u dokku rsync" -e 'ssh -i ~/.ssh/rbb-data.pem' build/ linux@rbb-dj-dev.app.rbb-cloud.de:/var/www/image-sliders/$SERVER_PATH
