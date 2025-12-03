import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 right-4 z-50 text-white bg-[#6556cd] p-3 rounded-lg'
      >
        <i className={`text-2xl ${isOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className='lg:hidden fixed inset-0 bg-black/50 z-30'
        />
      )}

      {/* Side Navigation */}
      <div className={`
        fixed lg:static
        w-[280px] sm:w-[300px] lg:w-[20%]
        h-full
        border-r-2 border-zinc-400
        p-6 sm:p-10
        bg-[#1f1e24]
        z-40
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <h1 className='text-xl sm:text-2xl text-white font-bold'>
          <i className="ri-tv-fill text-[#6556cd] mr-3"></i>
          <span className='text-xl sm:text-2xl'>CineCloud.</span>
        </h1>

        <nav className='flex flex-col text-zinc-400 gap-2 sm:gap-3 text-lg sm:text-xl'>
          <h1 className='text-white text-semibold text-lg sm:text-xl mt-8 sm:mt-10 mb-3 sm:mb-5'>New Feeds</h1>

          <Link 
            to="/trending" 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-fire-fill mr-2"></i>
            Trending
          </Link>
          <Link 
            to='/popular' 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-sparkling-fill mr-2"></i>
            Popular
          </Link>

          <Link 
            to='/movie' 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-movie-2-fill mr-2"></i>
            Movies
          </Link>

          <Link 
            to='/tv-shows' 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-tv-line mr-2"></i>
            TV Shows
          </Link>
          <Link 
            to='/people' 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-group-fill mr-2"></i>
            People
          </Link>
        </nav>

        <hr className='border-none h-px bg-zinc-400 my-4' />

        <nav className='flex flex-col text-zinc-400 gap-2 text-lg sm:text-xl'>
          <h1 className='text-white text-semibold text-lg sm:text-xl mt-6 sm:mt-10 mb-3 sm:mb-5'>Website Information</h1>

          <Link 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-information-2-fill mr-2"></i>
            About
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            className='hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4 sm:p-5'
          >
            <i className="ri-phone-fill mr-2"></i>
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  )
}

export default SideNav