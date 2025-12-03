import React from 'react'

import loaderGif from '../../public/loading.gif';

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img src={loaderGif} alt="" />
    </div>
  )
}

export default Loading