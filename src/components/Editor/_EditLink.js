import React from 'react'
import CopyToClipboard from 'components/CopyToClipboard/CopyToClipboard'

const EditLink = () => {
  return (
    <>
      <h2>Edit Link</h2>
      <p>copy this link to edit this component later</p>
      <CopyToClipboard code={window.location.href} copyText='copy edit link' />
    </>
  )
}

export default EditLink
