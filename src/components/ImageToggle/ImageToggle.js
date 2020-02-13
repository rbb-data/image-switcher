import React, { useState } from 'react'
import _ from './ImageToggle.module.sass'

import Toggle from '../_shared/Toggle/Toggle'

export default function ImageToggle ({ selectedImage }) {
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(selectedImage || 0)
  const images = [
    { src: 'https://i.picsum.photos/id/236/500/500.jpg', label: 'Im Zug' },
    { src: 'https://i.picsum.photos/id/238/500/500.jpg', label: 'Im Auto' }
  ]

  return <>
    <figure className={_.images}>
      {images.map(
        (img, idx) => <img src={img.src} alt={img.label} className={currentlySelectedImage === idx ? _.selected : ''} />
      )}
    </figure>
    <Toggle
      onChange={setCurrentlySelectedImage}
      options={images}
      format={img => img.label}
      active={images[currentlySelectedImage]} />
  </>

}
