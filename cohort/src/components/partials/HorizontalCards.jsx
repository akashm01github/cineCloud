import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full px-4 sm:px-8 pb-10">
      <div className="w-full flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-zinc-700">
        {data.map((d, i) => (
          <Link 
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[150px] sm:min-w-[180px] bg-zinc-900 p-2 sm:p-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <img
              className="w-full h-[200px] sm:h-[230px] rounded-lg object-cover"
              src={
                d.poster_path
                  ? `https://image.tmdb.org/t/p/w500${d.poster_path}`
                  : "/no-image.png"
              }
              alt={d.title || d.name}
            />

            <h1 className="mt-2 text-white text-base sm:text-lg font-semibold truncate">
              {d.title || d.name}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-3">
              {d.overview || "No description available."}
            </p>

            <span className="text-yellow-400 text-xs sm:text-sm">More</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HorizontalCards