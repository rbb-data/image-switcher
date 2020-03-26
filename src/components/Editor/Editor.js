import React from 'react'
import ImageToggle from 'components/ImageToggle/ImageToggle'
import EmbedCode from './_EmbedCode'
import EditLink from './_EditLink'
import ImageEditor from './_ImageEditor'
import _ from './Editor.module.sass'

const Editor = ({ images }) => {
  const hasImages = Array.isArray(images) && images.length
  return (
    <div className={_.editor}>
      {/* show config interface */}
      <h2>Preview</h2>
      {hasImages ? (
        <>
          <ImageToggle images={images} />
          <EmbedCode />
          <ImageEditor images={images} />
          <EditLink />
        </>
      ) : (
        <>
          <p>Please add an image using the form below.</p>
          <ImageEditor images={images} />
        </>
      )}
    </div>
  )
}

export default Editor
