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
    urlForValue: val => `./images/share_of_r0_after_intervention/${100-val}Mod.svg`,
    labelForValue: val => `SIR-Kurve mit Effekitivität der Maßnahmen von ${100-val}%`,
    min: 0,
    max: 50,
    step: 10,
    label: 'Rückgang der Neuansteckungen pro Infizierten (in %):'
  }

  return (
    <div className={_.app}>
      <ImageSlider config={sliderConfig} />
    </div>
  )
}

export default App
