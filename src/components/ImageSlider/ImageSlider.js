/* eslint-env browser */

import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'

import _ from './ImageSlider.module.sass'

/**
 * `images` is an array of entries looking like this:
 * ```
 * { src: 'https://url-to-your/image.jpg', label: 'Short Description' }
 * ```
 *
 * @param {Object} props
 */
export default function ImageSlider ({ config }) {
  const containerRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(config.defaultValue || config.min)
  const [containerHeight, setContainerHeight] = useState('auto')

  const adjustContainer = img => {
    if (containerHeight === 'auto' || img.height > parseInt(containerHeight.replace(/px$/, ''), 10)) {
      setContainerHeight(img.height + 'px')
    }
  }

  // TODO: This is really wasteful, there should be a better way
  const images = range(config.min, config.max + 1)
    .filter(val => (val - config.min) % config.step === 0)
    .map(val => [val, { src: config.urlForValue(val), alt: config.labelForValue(val) }])

  // console.log('config', config)
  // console.log('images', images)

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

  return <div className={_.imageSliderComponent}>
    <section>
      {config.title != null && <h1 className={_.imageSliderTitle}>{config.title}</h1>}
      <span className={_.imageSliderLabel}>{config.label(currentValue)}</span>
      <div className={_.rangeContainer}>
        <span className={_.labelMin}>{config.min}</span>
        <input
          type='range'
          min={config.min}
          max={config.max}
          step={config.step}
          defaultValue={currentValue}
          onChange={e => setCurrentValue(parseInt(e.target.value, 10))} />
        <span className={_.labelMax}>{config.max}</span>
      </div>
    </section>
    <figure ref={containerRef} style={{ height: containerHeight }} className={_.images}>
      {images.map(
        ([val, img]) =>
          <img
            key={`image-slider-${val}`}
            onLoad={updateContainerSize}
            src={img.src}
            alt={img.alt}
            className={currentValue === val ? _.selected : ''} />
      )}
    </figure>
  </div>
}

// ImageSlider.propTypes = {
//   images: PropTypes.array.isRequired,
//   selectedImage: PropTypes.number
// }
