import axios from '../../utils/axios';

export { removePerson } from '../reducers/PersonSlice';
import { loadPerson } from '../reducers/PersonSlice';

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
    try {
        // person detail
        const detail = await axios.get(`/person/${id}`);

        // external ids
        const externalId = await axios.get(`/person/${id}/external_ids`);

        // combined credits
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

        // images
        const images = await axios.get(`/person/${id}/images`);

        // --- FIX: taggedImages sometimes returns 500 for many actors ---
        let taggedImages = { data: { results: [] } };

        try {
            taggedImages = await axios.get(`/person/${id}/tagged_images`);
        } catch (err) {
            console.warn("tagged_images failed for this person, continuing...");
        }

        const cast = combinedCredits.data?.cast || [];
        const crew = combinedCredits.data?.crew || [];

        const knownFor = [...cast, ...crew]
            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
            .slice(0, 20);

        const ultimate = {
            detail: detail.data,
            externalId: externalId.data,
            combinedCredits: combinedCredits.data,
            knownFor,
            images: images.data?.profiles || [],
            taggedImages: taggedImages.data?.results || [],
        };

        dispatch(loadPerson(ultimate));
        console.log(ultimate);

    } catch (error) {
        console.log("Person Load Error:", error);
    }
};
