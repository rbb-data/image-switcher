#!/usr/bin/env bash

SERVER_PATH="$1"
SLIDER_ID="$( echo $SERVER_PATH | sed 's#/#-#g' )"

cat << EOF
<style>
#rbb-data--image-slider--$SLIDER_ID { width: 1px; min-width: 100%; }
@media screen and (max-width: 630px) {
  #rbb-data--image-slider--$SLIDER_ID { width: 100%; margin-left: 0; }
}
</style>
<iframe allowfullscreen="" id="rbb-data--image-slider--$SLIDER_ID" scrolling="no" src="https://dj1.app.rbb-cloud.de/image-sliders/$SERVER_PATH" height="600" frameborder="0"></iframe>
<script src="https://dj1.app.rbb-cloud.de/image-sliders/$SERVER_PATH/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#rbb-data--image-slider--$SLIDER_ID')</script>
EOF
