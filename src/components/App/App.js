/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import _ from './App.module.sass'

import ImageToggle from '../ImageToggle/ImageToggle'

function App (_) {


  return <div className={_.app}>
    <ImageToggle />
  </div>
}

export default App
