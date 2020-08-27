/* eslint-env browser */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import _ from './ImageToggle.module.sass'

import TabBar from '../_shared/TabBar/TabBar'

/**
 * `images` is an array of entries looking like this:
 * ```
 * { src: 'https://url-to-your/image.jpg', label: 'Short Description' }
 * ```
 *
 * @param {Object} props
 */
export default function ImageToggle({ images, selectedImage = 0 }) {
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(
    selectedImage
  )

  return (
    <div className={_.imageToggleComponent}>
      <TabBar
        id='foo'
        onSelect={setCurrentlySelectedImage}
        tabs={images}
        format={(img) => img.label}
        selectedTab={images[currentlySelectedImage]}
      />
      <figure className={_.images}>
        {images.map((img, idx) => (
          <img
            key={`image-toggle-${idx}`}
            src={img.src}
            alt={img.label}
            className={currentlySelectedImage === idx ? _.selected : ''}
          />
        ))}
      </figure>
    </div>
  )
}

ImageToggle.propTypes = {
  images: PropTypes.array.isRequired,
  selectedImage: PropTypes.number,
}
