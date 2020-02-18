/* eslint-env browser */

import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import _ from './ImageToggle.module.sass'

import TabBar from '../_shared/TabBar/TabBar'

export default function ImageToggle ({ selectedImage = 0 }) {
  const containerRef = useRef(null)
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(selectedImage)
  const [containerHeight, setContainerHeight] = useState('auto')
  const images = [
    { src: 'https://i.picsum.photos/id/236/500/500.jpg', label: 'Auf dem Land' },
    { src: 'https://i.picsum.photos/id/238/500/500.jpg', label: 'In der Stadt' },
    { src: 'https://i.picsum.photos/id/27/500/500.jpg', label: 'Auf See' }
  ]

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
  selectedImage: PropTypes.number
}
