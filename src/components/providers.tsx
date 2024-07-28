import React, { Children } from 'react'
import { Toaster } from 'react-hot-toast'

interface ProviderProps{
    children:React.ReactNode
}

const Providers = ({children}:ProviderProps) => {
  return (
    <>
    <Toaster position='top-center' reverseOrder ={false}/>
    {children}
    </>
  )
}

export default Providers