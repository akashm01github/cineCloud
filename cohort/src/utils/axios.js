import axios  from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmRiNmI3MmEzOWM3YTU2ZWEwMTcwZGFmZDI1ZDhjYiIsIm5iZiI6MTc2MzcyNTYyNS43NDgsInN1YiI6IjY5MjA1MTM5MzJmZDI1ZGZjMTA1ODk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLe9ZJmdXKJVUuUPWCBRLyyHedmTRPbQE6F_JYfiErY'
    }
})

export default instance;