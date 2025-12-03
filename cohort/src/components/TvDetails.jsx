import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv, removeTv } from "../store/actions/tvActions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const TvDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncLoadTv(id));

    return () => dispatch(removeTv());
  }, [dispatch, id]);

  if (!info) return <Loading />;

  const tv = info.detail;
  const videos = info.videos;
  const external = info.externalId;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original/${tv.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="min-h-screen w-full px-[5%] sm:px-[8%] lg:px-[10%] py-4 sm:py-6"
    >
      {/* NAV */}
      <nav className="w-full text-zinc-300 flex items-center justify-between">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-2xl sm:text-3xl text-white cursor-pointer hover:text-[#6556cd]"
        ></i>
      </nav>

      {/* MAIN CONTENT */}
      <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-start">
        {/* POSTER */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
          alt=""
          className="w-full sm:w-[200px] lg:w-[260px] rounded-2xl shadow-lg mx-auto lg:mx-0"
        />

        {/* DETAILS */}
        <div className="text-white w-full lg:max-w-[60%]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4">
            {tv.name}
          </h1>

          {/* GENRES */}
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
            {tv.genres?.map((g) => (
              <span
                key={g.id}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/20 rounded-full"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* EPISODES + FIRST AIR DATE */}
          <p className="text-zinc-300 mb-2 text-sm sm:text-base">
            {tv.number_of_seasons} Seasons • {tv.number_of_episodes} Episodes •{" "}
            {tv.first_air_date}
          </p>

          {/* OVERVIEW */}
          <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            {tv.overview}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            {external?.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${external.imdb_id}`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-yellow-500 text-black rounded-xl font-semibold hover:bg-yellow-400 text-sm sm:text-base"
              >
                IMDB
              </a>
            )}

            {tv.homepage && (
              <a
                href={tv.homepage}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-white/20 rounded-xl backdrop-blur-lg text-sm sm:text-base"
              >
                Official Site
              </a>
            )}

            {videos?.key && (
              <a
                href={`https://www.youtube.com/watch?v=${videos.key}`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-red-600 rounded-xl font-medium text-sm sm:text-base"
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="mt-10 sm:mt-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-5">
          Recommended
        </h2>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4">
          {info.recommendations?.map((item) => (
            <div key={item.id} className="min-w-[120px] sm:min-w-[150px]">
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                className="rounded-xl w-[120px] sm:w-[150px] h-[180px] sm:h-[225px] object-cover"
              />
              <p className="text-zinc-300 mt-2 text-xs sm:text-sm line-clamp-2">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvDetails;