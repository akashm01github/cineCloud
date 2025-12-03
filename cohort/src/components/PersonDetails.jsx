import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPerson, removePerson } from "../store/actions/personActions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => dispatch(removePerson());
  }, [dispatch, id]);

  if (!info) return <Loading />;

  const person = info.detail;
  const external = info.externalId;
  const credits = info.combinedCredits;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original/${person.profile_path})`,
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
        {/* PROFILE IMAGE */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path || person.profile_path}`}
          alt=""
          className="w-full sm:w-[200px] lg:w-[260px] rounded-2xl shadow-lg mx-auto lg:mx-0"
        />

        {/* DETAILS */}
        <div className="text-white w-full lg:max-w-[60%]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4">
            {person.name}
          </h1>

          {/* BIRTH INFO */}
          <p className="text-zinc-300 mb-3 text-base sm:text-lg">
            {person.birthday && <>Born: {person.birthday}</>}
            {person.place_of_birth && <> • {person.place_of_birth}</>}
          </p>

          {/* BIOGRAPHY */}
          <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            {person.biography || "No biography available."}
          </p>

          {/* BUTTONS / LINKS */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            {external?.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${external.imdb_id}`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-yellow-500 text-black rounded-xl font-semibold hover:bg-yellow-400 text-sm sm:text-base"
              >
                IMDB
              </a>
            )}

            {external?.instagram_id && (
              <a
                href={`https://instagram.com/${external.instagram_id}`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-white/20 rounded-xl text-sm sm:text-base"
              >
                Instagram
              </a>
            )}

            {external?.twitter_id && (
              <a
                href={`https://x.com/${external.twitter_id}`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-white/20 rounded-xl text-sm sm:text-base"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* KNOWN FOR SECTION */}
      <div className="mt-10 sm:mt-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-5">
          Known For
        </h2>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4">
          {credits?.cast?.map((item) => (
            <div
              key={item.credit_id}
              className="min-w-[120px] sm:min-w-[150px] cursor-pointer"
              onClick={() =>
                navigate(`/${item.media_type}/${item.id}`)
              }
            >
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                className="rounded-xl w-[120px] sm:w-[150px] h-[180px] sm:h-[225px] object-cover"
              />
              <p className="text-zinc-300 mt-2 text-xs sm:text-sm line-clamp-2">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;