import React from 'react'

const Layout = ({children, style}) => {
    return (
      <div className={` ${style} font-poppins max-md:overflow-hidden`}>
          {children}
      </div>
    )
  }

export default Layout