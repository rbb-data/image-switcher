import React, { useState } from 'react'
import nanoid from 'nanoid'
import copy from 'copy-text-to-clipboard'
import _ from './_EmbedCode.module.sass'

const EmbedCode = () => {
  const [copySuccsess, setSuccsess] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null)

  const nodeId = `rbb-data--image-toggle--${nanoid()}`
  const embedCode = `<style>
#${nodeId} { width: 1px; min-width: 100%; }
</style>
<iframe allowfullscreen="" width="100%" height="600" frameborder="0" src="${
    window.location.href
  }&embed=1" id="${nodeId}"></iframe>
<script src="${process.env.PUBLIC_URL ||
    window.location.origin}/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#${nodeId}')</script>`

  // copies text to clipboard and notifies the user on success
  const copyEmbedCode = () => {
    const copied = copy(embedCode)

    if (timeoutId) clearTimeout(timeoutId)

    // clear message after 5s on success, 10s when failed
    const id = setTimeout(() => setTimeoutId(null), copied ? 5000 : 10000)
    setTimeoutId(id)
    setSuccsess(copied)
  }

  return (
    <>
      <h2>Embed Code</h2>
      <textarea className={_.textArea} readOnly value={embedCode} />
      <button className={_.button} onClick={copyEmbedCode}>
        Copy code
      </button>
      {timeoutId != null &&
        (copySuccsess ? (
          <span className={_.copyMessageSuccess}>Copied!</span>
        ) : (
          <span className={_.copyMessageFailure}>Copying failed</span>
        ))}
    </>
  )
}

export default EmbedCode
