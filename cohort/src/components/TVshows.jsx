import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const TVshows = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("airing_today");  
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = `CineCloud | TV Shows ` + type.toUpperCase();

  const getShows = async () => {
    try {
      const { data } = await axios.get(
        `/tv/${type}?page=${page}`
      );

      setShows(prev => [...prev, ...data.results]);

      if (data.results.length < 20) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setShows([]);
    setPage(1);
    setHasMore(true);
    getShows();
  }, [type]);

  return shows.length > 0 ? (
    <div className="w-screen min-h-screen px-[3%] pt-4 sm:pt-0">

      {/* TOP HEADER */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-0">
        <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-xl sm:text-2xl mr-2 text-white hover:text-[#6556cd] cursor-pointer"
          ></i>
          TV Shows
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-[85%] gap-3 sm:gap-0">
          <TopNav />

          {/* TV Dropdown */}
          <Dropdown
            title="Filter"
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            func={(e) => setType(e.target.value)}
          />
        </div>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={shows.length}
        next={getShows}
        hasMore={hasMore}
        loader={<h1 className='text-white text-center py-4'>Loading...</h1>}
        style={{ overflow: "visible" }}
      >
        <Cards data={shows} title="tv" />
      </InfiniteScroll>

    </div>
  ) : (
    <Loading />
  );
};

export default TVshows;