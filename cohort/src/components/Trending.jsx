import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState("movie");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    document.title = "CineCloud | Trending " + category.toUpperCase();

    const getTrending = async () => {
        try {
            const { data } = await axios.get(
                `/trending/${category}/${duration}?page=${page}`
            );

            setTrending(prev => [...prev, ...data.results]);

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
        setTrending([]);
        setPage(1);
        setHasMore(true);

        getTrending(); 
    }, [category, duration]);

    return trending.length > 0 ? (
        <div className="w-screen min-h-screen px-[3%] pt-4 sm:pt-0">

            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-0">
                <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold flex items-center">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line text-xl sm:text-2xl mr-2 text-white hover:text-[#6556cd] cursor-pointer"
                    ></i>
                    Trending
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-[85%] gap-3 sm:gap-0">
                    <TopNav />

                    <div className="flex gap-3 sm:gap-0">
                        <Dropdown

                            title="category"
                            options={["movie", "tv"]}
                            func={(e) => setCategory(e.target.value)}
                        />

                        <div className="w-0 sm:w-[2%]"></div>

                        <Dropdown
                            title="duration"
                            options={["week", "day"]}
                            func={(e) => setDuration(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={getTrending}
                hasMore={hasMore}
                loader={<h1 className='text-white text-center py-4'>Loading...</h1>}
                style={{ overflow: "visible" }}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>

        </div>
    ) : (
        <Loading />
    );
};

export default Trending;