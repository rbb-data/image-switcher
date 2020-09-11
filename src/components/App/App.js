/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React from 'react'

import _ from './App.module.sass'
import ImageSlider from 'components/ImageSlider/ImageSlider'

function App (_props) {
  const sliderConfig = {
    urlForValue: val => `./images/corona-second-wave/mosaic_1_of_2_${val * 7}_days.png`,
    labelForValue: val => `Trenddauer von ${val} Wochen`,
    min: 1,
    max: 4,
    step: 1,
    label: val => `Trenddauer in Wochen: ${val}`
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
