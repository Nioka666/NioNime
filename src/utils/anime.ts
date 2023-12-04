/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// anime.ts
import axios, { AxiosInstance } from "axios";

const seasonalAnime = "/api/seasonal/anime?fields=[id,title,coverImage,genres]";
const recentAnime = "/api/recent?type={type}&page={page}&perPage={perPage}";
const animeSearch = "/api/anime/gogoanime/{query}";
const animeDetails = "/api/info/{id}";
const animeStreamLink = "/api/anime/gogoanime/watch/{episodeId}";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Cache-Control": "max-age=6666",
    "Access-Control-Allow-Origin": "*",
  },
});

// Search anime
export const fetchSearchAnime = async (query: string, page: number) => {
  try {
    const url = `${animeSearch}?query=${query}&page=${page}`;
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
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

// Fetch Anime Link Streaming
export const fetchAnimeStreamLink = async (
  episodeId: number,
  server: string
) => {
  try {
    const res = await axiosInstance.get(
      `${animeStreamLink}?episodeId=${episodeId}&server=${server}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
