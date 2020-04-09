/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React from 'react'

import _ from './App.module.sass'
import ImageSlider from 'components/ImageSlider/ImageSlider'

function App (_props) {
  const sliderConfig = {
    urlForValue: val => `./images/effect/${val}.svg`,
    labelForValue: val => `SIR-Kurve mit einem Maßnahmeneffekt von ${val}%`,
    min: 10,
    max: 90,
    step: 10,
    label: 'Effekt der Einschränkungen:'
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
