import React from 'react'
import Nav from './Nav'

function MainPageLayout({children}) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default MainPageLayout
