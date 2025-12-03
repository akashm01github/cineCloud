import axios from '../../utils/axios';
import { loadTv, removeTv } from '../reducers/TvSlice';

export { removeTv };

export const asyncLoadTv = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalId = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

        let ultimate = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchProviders: watchProviders.data.results?.IN,
        };

        dispatch(loadTv(ultimate));
        console.log(ultimate);

    } catch (error) {
        console.log(error);
    }
};
