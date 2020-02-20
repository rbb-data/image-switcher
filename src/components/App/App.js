/* eslint-env browser */

import React, { useEffect, useState } from 'react'
import _ from './App.module.sass'
import qs from 'qs'

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

  return <div className={_.app}>
    <h2>Preview</h2>
    {Array.isArray(imageToggleConfig.images) && imageToggleConfig.images.length
      ? <>
        <ImageToggle images={imageToggleConfig.images} />
        <h2>Embed Code</h2>
        {/* FIXME: This isn't updated properly */}
        <textarea readOnly>
          {'<iframe width="100%" src="' + window.location.href + '&embed"></iframe>'}
        </textarea>
      </>
      : <p>Please add an image using the form below.</p>}
    {/* Appending &embed to the URL in any form will hide the following form
        and create an embeddable version of this page. */}
    {imageToggleConfig.embed == null &&
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
      </div>}
  </div>
}

export default App
