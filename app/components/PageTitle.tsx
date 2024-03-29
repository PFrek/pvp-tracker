import React from 'react'

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="hero min-h-full">
      <div className="hero-content text-center">
        <h1 className="text-4xl">{title}</h1>
      </div>
    </div>
  )
}

export default PageTitle