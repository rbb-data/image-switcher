/* global fetch */

import React from 'react'
import 'whatwg-fetch'
import _ from './App.module.sass'

import ImageToggle from '../ImageToggle/ImageToggle'

function App (_props) {
  return <div className={_.app}>
    <ImageToggle />
  </div>
}

export default App
