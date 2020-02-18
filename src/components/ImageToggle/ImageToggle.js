/* eslint-env browser */

import React, { useState } from 'react'
import _ from './ImageToggle.module.sass'

import Toggle from '../_shared/Toggle/Toggle'

export default function ImageToggle ({ selectedImage }) {
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(selectedImage || 0)
  const [containerHeight, setContainerHeight] = useState('auto')
  const images = [
    { src: 'https://i.picsum.photos/id/236/500/500.jpg', label: 'Auf dem Land' },
    { src: 'https://i.picsum.photos/id/238/500/500.jpg', label: 'In der Stadt' }
  ]

  const imageLoaded = e => {
    // we want to get the unscaled image height
    const img = new Image()
    img.src = e.target.src

    if (containerHeight === 'auto' || img.height > parseInt(containerHeight.replace(/px$/, ''), 10)) {
      setContainerHeight(img.height + 'px')
    }
  }

  return <div className={_.imageToggleComponent}>
    <figure style={{ height: containerHeight }} className={_.images}>
      {images.map(
        (img, idx) =>
          <img
            onLoad={imageLoaded}
            src={img.src}
            alt={img.label}
            className={currentlySelectedImage === idx ? _.selected : ''} />
      )}
    </figure>
    <Toggle
      onChange={setCurrentlySelectedImage}
      options={images}
      format={img => img.label}
      active={images[currentlySelectedImage]} />
  </div>
}
