import React, { useState } from 'react'
import copy from 'copy-text-to-clipboard'
import _ from './CopyToClipboard.module.sass'

const CopyToClipboard = ({ code, copyText }) => {
  const [copySuccsess, setSuccsess] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null)

  // copies text to clipboard and notifies the user on success
  const copyCode = () => {
    const copied = copy(code)

    if (timeoutId) clearTimeout(timeoutId)

    // clear message after 5s on success, 10s when failed
    const id = setTimeout(() => setTimeoutId(null), copied ? 5000 : 10000)
    setTimeoutId(id)
    setSuccsess(copied)
  }

  return (
    <>
      <textarea className={_.textArea} readOnly value={code} />
      <button className={_.button} onClick={copyCode}>
        {copyText}
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

export default CopyToClipboard
