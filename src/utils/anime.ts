/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
// anime.ts
import axios from "axios";

const popularAnime = "https://api.consumet.org/anime/gogoanime/top-airing";
const recentAnime = "https://api.consumet.org/anime/gogoanime/recent-episodes";
const animeSearch =
  "https://api.consumet.org/anime/gogoanime/{query}?page={number}";
const animeDetails = "https://api.consumet.org/anime/gogoanime/info/{id}";
const animeStreamLink =
  "https://api.consumet.org/anime/gogoanime/watch/{episodeId}?server={serverName}";
//
// interface AnimeSearchResponse {}

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "max-age=6666",
  },
});

// Search anime
export const fetchSearchAnime = async (query: string, page: number) => {
  try {
    const url = animeSearch
      .replace("{query}", query)
      .replace("{number}", String(page));
    const res = await axiosInstance.get(
      url
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Recent Anime
export const fetchRecentAnime = async (page: number) => {
  try {
    const res = await axiosInstance.get(recentAnime, {
      params: { page: page },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Top anime
export const fetchTopAnimeData = async (page: number) => {
  try {
    const res = await axiosInstance.get(popularAnime, {
      params: { page: page },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Fetch detail anime
export const fetchAnimeDetail = async (id: any) => {
  try {
    const url = animeDetails.replace("{id}", id);
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Merge & Fetch All anime data
export const fetchAllAnimeData = async (page: any) => {
  try {
    const topAnimeData = await fetchTopAnimeData(page);

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
    console.log(err);
  }
};

// Fetch Anime Link Streaming
export const fetchAnimeStreamLink = async (episode: number, server: string) => {
  try {
    const res = await axios.get(animeStreamLink, {
      params: { episode, server },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
