/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React, { useEffect, useState } from 'react'
import qs from 'qs'

import _ from './App.module.sass'
import ImageToggle from 'components/ImageToggle/ImageToggle'
import Editor from 'components/Editor/Editor'

// parse query string from location hash
function parseQueryString() {
  if (!window.location.hash.match(/\?/)) return {}
  return qs.parse(window.location.hash.split('?')[1])
}

function useQueryString() {
  const [query, setQuery] = useState(parseQueryString)
  const onHashChange = _ => setQuery(parseQueryString())

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return function cleanup() {
      window.removeEventListener('hashchange', onHashChange)
    }
  })

  return query
}

function App(_props) {
  const imageToggleConfig = useQueryString()

  return (
    <div className={_.app}>
      {/* Appending &embed to the URL in any form will hide the following form
        and create an embeddable version of this page. */}
      {imageToggleConfig.embed == null ? (
        <Editor images={imageToggleConfig.images} />
      ) : (
        <>
          {/* show only the embed */}
          <ImageToggle images={imageToggleConfig.images} />
        </>
      )}
    </div>
  )
}

export default App
