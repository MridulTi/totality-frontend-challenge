import { DashNav} from '@components/Nav'
import { AppProvider } from '@context/AppProviders'
import React from 'react'

export default function DashLayout({children}) {
  return (
    <AppProvider>
    <DashNav/>
    {children}
    </AppProvider>
  )
}
