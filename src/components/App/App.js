/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React from 'react'

import _ from './App.module.sass'
import ImageSlider from 'components/ImageSlider/ImageSlider'

function App (_props) {
  const sliderConfig = {
    urlForValue: val => `./images/circle-${val}.png`,
    min: 20,
    max: 100,
    step: 10,
    label: 'Dauer der Maßnahme in Wochen:'
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
