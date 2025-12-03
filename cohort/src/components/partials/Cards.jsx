import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  console.log(data)
  return (
    <div className="w-full px-2 sm:px-0">
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-200 mb-4 sm:mb-6">
          {title.toUpperCase()}
        </h2>
      )}

      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center sm:justify-start">
        {data.map((c, i) => {
          const img = c.backdrop_path || c.poster_path || c.profile_path;

          return (
            <Link
              to={`/${c.media_type || title}/details/${c.id}`}
              key={i}
              className="w-[45%] sm:w-[30%] md:w-[22vh] cursor-pointer group"
            >
              <div className="w-full h-[25vh] sm:h-[30vh] md:h-[32vh] overflow-hidden rounded-xl shadow-md shadow-black/40 bg-zinc-800">
                <img
                  className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-110"
                  src={
                    img
                      ? `https://image.tmdb.org/t/p/original/${img}`
                      : "/no-image.png"
                  }
                  alt=""
                />
              </div>

              <h1 className="text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 font-medium text-zinc-300 group-hover:text-white transition line-clamp-2">
                {c.title || c.name || c.original_title}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;