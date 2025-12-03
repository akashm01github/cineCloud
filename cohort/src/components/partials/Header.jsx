import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  return (
    <div style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize:"cover",
        backgroundRepeat: "no-repeat"
    }} className='w-full h-[40vh] sm:h-[50vh] flex flex-col justify-end items-start p-[5%] gap-2 sm:gap-3'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white'>
          {data.title || data.name || data.original_title}
        </h1>

        <Link to={`/${data.media_type}/details/${data.id}`} className='text-sm sm:text-base lg:text-lg w-[90%] sm:w-[80%] lg:w-[70%] font-thin text-white line-clamp-2 sm:line-clamp-3'>
          {data.overview.slice(0,100)}...
          <span className='text-yellow-500'>More</span>
        </Link>

        <p className='text-white flex flex-wrap justify-start items-center gap-2 sm:gap-4 text-sm sm:text-base'>
            <span className='flex items-center'>
              <i className="ri-megaphone-fill text-xl sm:text-2xl text-yellow-500 mr-1"></i>
              {data.release_date || "No Info"}
            </span>
            <span className='flex items-center'>
              <i className="ri-file-video-fill text-xl sm:text-2xl text-yellow-500 mr-1"></i>
              {data.media_type.toUpperCase()}
            </span>
        </p>

        <Link className='text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 bg-[#6556cd] mt-3 sm:mt-5 rounded'>
          Watch Trailer
        </Link>
    </div>
  )
}

export default Header