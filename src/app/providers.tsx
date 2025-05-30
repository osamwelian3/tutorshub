'use client'

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

function Providers({children}: Readonly<{children: ReactNode}>) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default Providers