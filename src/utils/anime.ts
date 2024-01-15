/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// anime.ts
import axios, { AxiosInstance } from "axios";

// URL
const seasonalAnime =
  "/api/seasonal/anime?fields=[id,title,coverImage,genres,description]";
const recentAnime = "/api/recent?type={type}&page={page}&perPage={perPage}";
const animeSearch = "/api/search/anime/{query}/{page}/{perPage}";
const animeDetails = "/api/info/{id}";
const gogoanimeStreamLink =
  "/api/sources?providerId=gogoanime&watchId=%2F{watchId}&episodeNumber={episodeNumber}&id={animeId}&subType=sub&server=gogocdn";
const zoroStreamLink =
  "/api/sources?providerId=zoro&watchId={watchId}&episodeNumber={episodeNumber}&id={animeId}&subType=sub";
const animeEpisodes = "/api/episodes/{id}";
// ---------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Cache-Control": "max-age=6666",
    "Access-Control-Allow-Origin": "*",
  },
});

// Anime Episodes
export const fetchAnimeEpisodes = async (id: any) => {
  try {
    const res = await axiosInstance.get(`${animeEpisodes.replace("{id}", id)}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Search anime
export const fetchSearchAnime = async (
  query: string,
  page: number,
  perPage: number
) => {
  try {
    const res = await axiosInstance.get(
      `${animeSearch
        .replace("{query}", query)
        .replace("{page}", page.toString())
        .replace("{perPage}", perPage.toString())}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Fetch Anime Link Streaming
export const fetchAnimeStreamLink = async (
  watchId: string,
  episodeNumber: any,
  animeId: any
) => {
  try {
    const res = await axiosInstance.get(
      `${gogoanimeStreamLink
        .replace("{watchId}", watchId)
        .replace("{episodeNumber}", episodeNumber.toString())
        .replace("{animeId}", animeId)}`
    );
    return res.data;
  } catch (err) {
    throw new Error();
  }
};

// Recent Anime
export const fetchRecentAnime = async (
  type: string,
  page: number,
  perPage: number
) => {
  try {
    const res = await axiosInstance.get(
      `${recentAnime
        .replace("{type}", type)
        .replace("{page}", page.toString())
        .replace("{perPage}", perPage.toString())}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching Recent anime data:", err);
    throw err;
  }
};

// Top anime
export const fetchTopAnimeData = async () => {
  try {
    const res = await axiosInstance.get(`${seasonalAnime}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Fetch detail anime
export const fetchAnimeDetail = async (id: any) => {
  try {
    const res = await axiosInstance.get(`${animeDetails.replace("{id}", id)}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching anime detail:", err);
    throw err;
  }
};

// Merge & Fetch All anime data
export const fetchAllAnimeData = async (_page: any) => {
  try {
    const topAnimeData = await fetchTopAnimeData();

    // Fetch details for each anime in parallel
    const animeDetailsPromises = topAnimeData.results.map(
      async (anime: { id: any }) => {
        return {
          ...anime,
          detail: fetchAnimeDetail(anime.id),
        };
      }
    );

    // Wait for all details to be fetched
    const animeDetails = await Promise.all(animeDetailsPromises);

    return {
      ...topAnimeData,
      results: animeDetails,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

console.log(zoroStreamLink);
