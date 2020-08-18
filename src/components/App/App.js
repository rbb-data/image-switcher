/* eslint-env browser */

import 'iframe-resizer/js/iframeResizer.contentWindow.js'

import React from 'react'

import _ from './App.module.sass'
import ImageSlider from 'components/ImageSlider/ImageSlider'

function App (_props) {
  const sliderConfig = {
    //urlForValue: val => `./images/duration_of_intervention/${val}Mod.svg`,
    //labelForValue: val => `SIR-Kurve mit Maßnahmendauer von ${val}`,
    //min: 4,
    //max: 8,
    //step: 1,
    //label: 'Wochen mit aktuellen Einschränkungen:'
    urlForValue: val => `./images/schutzsuchendenquote/${val}_1.svg`,
    labelForValue: val => `Situation für das Jahr ${val}`,
    min: 2014,
    max: 2019,
    step: 1,
    label: 'Anteil Schutzsuchende im Jahr:'
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
