import React, { useEffect, useState } from 'react'
import _ from './App.module.sass'
import qs from 'qs'

import ImageToggle from '../ImageToggle/ImageToggle'

// parse query string from location hash
function parseQueryString () {
  if (!window.location.hash.match(/\?/)) return {}
  return qs.parse(window.location.hash.split('?')[1])
}

function useQueryString (onChange) {
  const [query, setQuery] = useState(parseQueryString)
  const onHashChange = _ => setQuery(parseQueryString())

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return function cleanup () {
      window.removeEventListener('hashchange', onHashChange)
    }
  })

  return query
}

function App (_props) {
  const query = useQueryString()
  console.log('query', query)

  return <div className={_.app}>
    <p>
      Temporibus laudantium rerum quidem. Recusandae asperiores recusandae sunt accusamus. Corrupti repudiandae amet facere. Facere est voluptas magni quod ex consequatur aut quia. Magnam aut ea deserunt est.
    </p>
    <ImageToggle />
    <p>
      Illo consequatur autem culpa qui voluptate fugit. Mollitia et quia est est tempore cum placeat. Non rerum suscipit eius. Libero et atque animi eum. Facilis itaque dignissimos officiis perferendis.
    </p>
  </div>
}

export default App
