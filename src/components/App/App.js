import React, { useEffect, useState } from 'react'
import _ from './App.module.sass'
import qs from 'qs'

import ImageToggle from '../ImageToggle/ImageToggle'

// parse query string from location hash
function parseQueryString () {
  if (!window.location.hash.match(/\?/)) return {}
  return qs.parse(window.location.hash.split('?')[1])
}

function useQueryString (onChange) {
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

  const removeImage = idx => e => {
    const images = [].concat(
      imageToggleConfig.images.slice(0, idx),
      imageToggleConfig.images.slice(idx + 1)
    )

    window.location.hash = '?' + qs.stringify({ images })
    e.preventDefault()
  }

  return <div className={_.app}>
    <ImageToggle />
    {/* Appending &embed to the URL in any form will hide the following form
        and create an embeddable version of this page. */}
    {imageToggleConfig.embed == null &&
      <div className={_.imageToggleConfig}>
        <h2>Configuration</h2>
        <form onSubmit={e => e.preventDefault()}>
          {Array.isArray(imageToggleConfig.images) &&
            <>
              <h3>Image List</h3>
              <ol className={_.imageList}>
                {imageToggleConfig.images.map((img, idx) =>
                  <li key={'img-' + idx}>
                    <strong>{img.label}</strong> – <code>{img.src}</code>
                    <a href='#' onClick={removeImage(idx)} className={_.removeLink}>Remove Image</a>
                  </li>
                )}
              </ol>
            </>}
          <h3>Add New Image</h3>
          <div className={_.addImageRow}>
            <label>Image URL:</label>
            <input type='text' name='imgUrl' />
            <label>Image Label:</label>
            <input type='text' name='imgLabel' />
            <input type='submit' value='+' />
          </div>
        </form>
      </div>}
  </div>
}

export default App
