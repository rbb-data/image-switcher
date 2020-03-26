import React, { useState } from 'react'
import copy from 'copy-text-to-clipboard'
import _ from './_EditLink.module.sass'

const EmbedCode = () => {
  const [copySuccsess, setSuccsess] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null)

  const editLink = window.location.href

  // copies text to clipboard and notifies the user on success
  const copyEditLink = () => {
    const copied = copy(editLink)

    if (timeoutId) clearTimeout(timeoutId)

    // clear message after 5s on success, 10s when failed
    const id = setTimeout(() => setTimeoutId(null), copied ? 5000 : 10000)
    setTimeoutId(id)
    setSuccsess(copied)
  }

  return (
    <>
      <h2>Edit Link</h2>
      <p>save this link so you can edit this switcher again later</p>
      <textarea className={_.textArea} readOnly value={editLink} />
      <button className={_.button} onClick={copyEditLink}>
        Copy edit Link
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
