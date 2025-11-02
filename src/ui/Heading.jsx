import React from 'react'

export default function Heading({children}) {
  return (
    <h1 className="text-center text-2xl font-semibold text-amber-500 uppercase mb-6">{children}</h1>
  )
}
