import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import noImageFound from '/no-image.png'

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([])

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetSearches();
  }, [query])

  return (
    <div className='w-full h-auto sm:h-[10vh] relative flex flex-row justify-start items-center px-4 sm:px-[10%] lg:px-[20%] py-4 sm:py-0 gap-2 lg:pt-0 pt-16'>
      <i className="ri-search-line text-2xl sm:text-3xl text-zinc-400"></i>
      <input 
        value={query} 
        onChange={(e) => { setquery(e.target.value) }} 
        type="text" 
        placeholder='Search Anything....' 
        className='w-full sm:w-[50%] mx-0 sm:mx-10 p-3 sm:p-5 text-base sm:text-xl outline-0 border-0 bg-transparent text-zinc-400' 
      />

      {query.length > 0 && (
        <i 
          onClick={() => { setquery("") }} 
          className="ri-close-large-line text-xl sm:text-2xl text-zinc-400 cursor-pointer"
        ></i>
      )}

      {query.length > 0 && searches.length > 0 && (
        <div className='w-[90%] sm:w-[50%] max-h-[50vh] overflow-auto bg-zinc-300 absolute top-full left-[5%] sm:left-auto rounded z-50 shadow-xl'>
          {searches.map((s, i) => {
            return (
              <Link 
                to={`/${s.media_type}/details/${s.id}`} 
                key={i} 
                className='w-full text-zinc-800 hover:bg-zinc-500 duration-300 font-semibold hover:text-black p-4 sm:p-10 flex justify-start items-center gap-3 border-b-2 border-zinc-100'
              >
                <img
                  className='w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] object-top object-cover rounded shrink-0'
                  src={
                    s.poster_path || s.backdrop_path || s.profile_path || s.logo_path || s.still_path
                      ? `https://image.tmdb.org/t/p/original/${s.poster_path || s.backdrop_path || s.profile_path || s.logo_path || s.still_path}`
                      : noImageFound
                  }
                  alt=""
                />
                <span className='text-sm sm:text-base truncate'>{s.title || s.name || s.original_title}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TopNav