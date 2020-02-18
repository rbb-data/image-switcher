/* eslint-env browser */

import React, { useRef, useState, useEffect } from 'react'
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
export default function ImageToggle ({ images, selectedImage = 0 }) {
  const containerRef = useRef(null)
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(selectedImage)
  const [containerHeight, setContainerHeight] = useState('auto')

  const adjustContainer = img => {
    if (containerHeight === 'auto' || img.height > parseInt(containerHeight.replace(/px$/, ''), 10)) {
      setContainerHeight(img.height + 'px')
    }
  }

  // when we load an image, the container should be as high as the tallest one
  const updateContainerSize = e => adjustContainer(e.target)

  // when the image size changes we update the container size accordingly
  const monitorAvailableSpace = _ => {
    if (containerRef.current != null) {
      // FIXME: This is buggy and doesn't always work
      setContainerHeight('auto')
      window.requestAnimationFrame(_ => {
        let imgs = Array.from(containerRef.current.querySelectorAll('img'))
        imgs.forEach(img => adjustContainer(img))
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', monitorAvailableSpace)
    return () => window.removeEventListener('resize', monitorAvailableSpace)
  }, [])

  return <div className={_.imageToggleComponent}>
    <TabBar
      id='foo'
      onSelect={setCurrentlySelectedImage}
      tabs={images}
      format={img => img.label}
      selectedTab={images[currentlySelectedImage]} />
    <figure ref={containerRef} style={{ height: containerHeight }} className={_.images}>
      {images.map(
        (img, idx) =>
          <img
            key={`image-toggle-${idx}`}
            onLoad={updateContainerSize}
            src={img.src}
            alt={img.label}
            className={currentlySelectedImage === idx ? _.selected : ''} />
      )}
    </figure>
  </div>
}

ImageToggle.propTypes = {
  images: PropTypes.array.isRequired,
  selectedImage: PropTypes.number
}
