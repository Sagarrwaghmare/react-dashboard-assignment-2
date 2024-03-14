import React from 'react'

function Loader({loader,div}) {
  return (

    <>
      {loader ? (
        div
        ) : (
          <div className="loader-container">
        <div className="spinner"></div>
        </div>
        )}
      </>
  )
}

export default Loader