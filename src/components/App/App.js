/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React from 'react'

import _ from './App.module.sass'
import ImageSlider from 'components/ImageSlider/ImageSlider'

function App (_props) {
  const sliderConfig = {
    urlForValue: val => `./images/corona-second-wave/mosaic_2_of_2_${val * 7}_days.png`,
    labelForValue: val => `Trenddauer von mindestens ${val} Woche(n)`,
    min: 1,
    max: 4,
    step: 1,
    title: 'Wie sich die Epidemie in Bundesländern mit niedriger Inzidenz entwickelte',
    label: val => `Trenddauer von mindestens ${val} Woche(n)`
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
