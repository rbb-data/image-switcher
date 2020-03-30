import React from 'react'
import nanoid from 'nanoid'
import CopyToClipboard from 'components/CopyToClipboard/CopyToClipboard'

const EmbedCode = () => {
  const nodeId = `rbb-data--image-toggle--${nanoid()}`
  const embedCode = `<style>
#${nodeId} { width: 1px; min-width: 100%; }
@media screen and (max-width: 630px) {
  #${nodeId} { width: 100%; margin-left: 0; }
}
</style>
<iframe allowfullscreen="" width="100%" height="600" frameborder="0" src="${
    window.location.href
  }&embed=1" id="${nodeId}"></iframe>
<script src="${process.env.PUBLIC_URL ||
    window.location.origin}/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#${nodeId}')</script>`

  return (
    <>
      <h2>Embed Code</h2>
      <CopyToClipboard code={embedCode} copyText='copy code' />
    </>
  )
}

export default EmbedCode
