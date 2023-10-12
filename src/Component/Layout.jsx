import React from 'react'

const Layout = ({children, style}) => {
    return (
      <div className={` ${style} font-poppins`}>
          {children}
      </div>
    )
  }

export default Layout