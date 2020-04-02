/* eslint-env browser */
import React from 'react'
import qs from 'qs'
import _ from './_ImageEditor.module.sass'

const ImageList = ({ images }) => {
  if (!Array.isArray(images)) return null

  // this is called whenever one of the links in the image list is clicked
  const removeImage = idx => e => {
    const updatedImages = [].concat(images.slice(0, idx), images.slice(idx + 1))

    window.location.hash = '?' + qs.stringify({ images: updatedImages })
    e.preventDefault()
  }

  return (
    <>
      <h3>Image List</h3>
      <ol className={_.imageList}>
        {images.map((img, idx) => (
          <li key={'img-' + idx}>
            <strong>{img.label}</strong> – <code>{img.src}</code>
            <button onClick={removeImage(idx)} className={_.removeLink}>
              Remove Image
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}

const ImageEditor = ({ images }) => {
  // this is called on submit
  const addImage = e => {
    // fetch current values
    const form = new FormData(e.target)
    const updatedImages = []
      .concat(images, [
        { src: form.get('imgSrc').trim(), label: form.get('imgLabel').trim() }
      ])
      .filter(img => img != null)

    // clear out old values
    Array.from(e.target.querySelectorAll('input[type=text]')).forEach(input => {
      input.value = ''
    })

    // update state
    window.location.hash = '?' + qs.stringify({ images: updatedImages })
    e.preventDefault()
  }

  return (
    <div className={_.imageToggleConfig}>
      <h2>Configuration</h2>
      <form onSubmit={addImage}>
        <ImageList images={images} />
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
  )
}

export default ImageEditor
