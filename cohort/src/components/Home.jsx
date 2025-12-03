import React, { useEffect, useState } from 'react'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'
import axios from '../utils/axios';
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';

const Home = () => {
  document.title = "CineCloud | HomePage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!wallpaper) getHeader();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />

      <div className="w-full lg:w-[80%]  min-h-screen overflow-y-auto overflow-x-hidden">

        <TopNav />
        <Header data={wallpaper} />

        {/* Trending Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 mt-6 mb-4 gap-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-200">Trending</h1>

          {/* Dropdown with callback */}
          <Dropdown
            title="Filter"
            options={["all", "movie", "tv"]}
            func={(e)=>setCategory(e.target.value)}
          />
        </div>

        {/* Cards */}
        <HorizontalCards data={trending} />

      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;