/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React, { useEffect, useState } from 'react'
import qs from 'qs'
import nanoid from 'nanoid'
import copy from 'copy-text-to-clipboard'

import _ from './App.module.sass'
import ImageToggle from '../ImageToggle/ImageToggle'

// parse query string from location hash
function parseQueryString () {
  if (!window.location.hash.match(/\?/)) return {}
  return qs.parse(window.location.hash.split('?')[1])
}

function useQueryString () {
  const [query, setQuery] = useState(parseQueryString)
  const onHashChange = _ => setQuery(parseQueryString())

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return function cleanup () {
      window.removeEventListener('hashchange', onHashChange)
    }
  })

  return query
}

function App (_props) {
  const imageToggleConfig = useQueryString()

  // looks like: { success: true, timeout: setTimeoutId }
  const [copyStatus, setCopyStatus] = useState({})

  // this is called on submit
  const addImage = e => {
    // fetch current values
    const form = new FormData(e.target)
    const images = [].concat(
      imageToggleConfig.images,
      [{ src: form.get('imgSrc').trim(), label: form.get('imgLabel').trim() }]
    ).filter(img => img != null)

    // clear out old values
    Array.from(e.target.querySelectorAll('input[type=text]'))
      .forEach(input => { input.value = '' })

    // update state
    window.location.hash = '?' + qs.stringify({ images })
    e.preventDefault()
  }

  // this is called whenever one of the links in the image list is clicked
  const removeImage = idx => e => {
    const images = [].concat(
      imageToggleConfig.images.slice(0, idx),
      imageToggleConfig.images.slice(idx + 1)
    )

    window.location.hash = '?' + qs.stringify({ images })
    e.preventDefault()
  }

  const nodeId = `rbb-data--image-toggle--${nanoid()}`
  const embedCode = `<style>
#${nodeId} { width: 1px; min-width: 100%; }
</style>
<iframe allowfullscreen="" width="100%" height="600" frameborder="0" src="${window.location.href}&embed=1" id="${nodeId}"></iframe>
<script src="${process.env.PUBLIC_URL || window.location.origin}/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#${nodeId}')</script>`

  // copies text to clipboard and notifies the user on success
  const copyEmbedCode = () => {
    const copied = copy(embedCode)

    if (copyStatus.id) clearTimeout(copyStatus.id)

    // clear message after 5s on success, 10s when
    const id = setTimeout(() => setCopyStatus({}), copied ? 5000 : 10000)
    setCopyStatus({
      success: copied,
      id: id
    })
  }

  return <div className={_.app}>
    {/* Appending &embed to the URL in any form will hide the following form
        and create an embeddable version of this page. */}
    {imageToggleConfig.embed == null
      ? <>
        {/* show config interface */}
        <h2>Preview</h2>
        {Array.isArray(imageToggleConfig.images) && imageToggleConfig.images.length
          ? <>
            <ImageToggle images={imageToggleConfig.images} />
            <h2>Embed Code</h2>
            <textarea readOnly value={embedCode} />
            <button onClick={copyEmbedCode}>Copy code</button>
            {copyStatus.id != null &&
              (copyStatus.success
                ? <span className={_.copyMessageSuccess}>Copied!</span>
                : <span className={_.copyMessageFailure}>Copying failed</span>)}
          </>
          : <p>Please add an image using the form below.</p>}
        <div className={_.imageToggleConfig}>
          <h2>Configuration</h2>
          <form onSubmit={addImage}>
            {Array.isArray(imageToggleConfig.images) &&
              <>
                <h3>Image List</h3>
                <ol className={_.imageList}>
                  {imageToggleConfig.images.map((img, idx) =>
                    <li key={'img-' + idx}>
                      <strong>{img.label}</strong> – <code>{img.src}</code>
                      <button onClick={removeImage(idx)} className={_.removeLink}>Remove Image</button>
                    </li>
                  )}
                </ol>
              </>}
            <h3>Add New Image</h3>
            <div className={_.addImageRow}>
              <label>Image Label:</label>
              <input required type='text' name='imgLabel' />
              <label>Image URL:</label>
              <input required type='text' name='imgSrc' />
              <input type='submit' value='+' />
            </div>
          </form>
        </div>
      </>
      : <>
        {/* show only the embed */}
        <ImageToggle images={imageToggleConfig.images} />
      </>}
  </div>
}

export default App
