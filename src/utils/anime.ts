/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

// ROUTES URL
export const serverURL = import.meta.env.VITE_SERVER_URL;
const seasonalAnime =
  "/api/seasonal/anime?fields=[id,title,coverImage,genres,description]";
const recentAnime = "/api/recent?type={type}&page={page}&perPage={perPage}";
const animeSearch = "/api/search/anime/{query}/{page}/{perPage}";
const animeDetails = "/api/info/{id}";
const gogoanimeStreamLink =
  "/api/sources?providerId=gogoanime&watchId=%2F{watchId}&episodeNumber={episodeNumber}&id={animeId}&subType=sub&server=gogocdn";
// const zoroStreamLink =
//   "/api/sources?providerId=zoro&watchId={watchId}&episodeNumber={episodeNumber}&id={animeId}&subType=sub";
const animeEpisodes = "/api/episodes/{id}";
const statsUrl = "/api/stats";

////////////////////////////////////////////////////

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Cache-Control": "max-age=6666",
    "Access-Control-Allow-Origin": "*",
  },
});

// Fetch Anify Stats
export const fetchAnifyStats = async () => {
  try {
    const res = await axios.get(statsUrl);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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

    const animeDetailsPromises = topAnimeData.results.map(
      async (anime: { id: any }) => {
        return {
          ...anime,
          detail: fetchAnimeDetail(anime.id),
        };
      }
    );

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

// Database Route
export const fetchUserData = async () => {
  try {
    const userData = await axios.get(`${serverURL}/api/user`, {
      withCredentials: true,
    });
    return userData.data;
  } catch (error) {
    // console.log(error);
  }
};

export const fetchUserMembershipData = async () => {
  try {
    const membership = await axios.get(`${serverURL}/api/membership-list`, {
      withCredentials: true,
    });
    return membership.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUserData = async () => {
  try {
    const user = await axios.get(`${serverURL}/api/users-list`, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdminData = async () => {
  try {
    const admin = await axios.get(`${serverURL}/api/admin-data`, {
      withCredentials: true,
    });
    return admin.data;
  } catch (error) {
    // console.error(error);
  }
};

export const doDeleteUser = async () => {
  try {
    const response = await axios.delete(`${serverURL}/api/user-delete`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTrxData = async () => {
  try {
    const response = await axios.get(`${serverURL}/api/transactions-data`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrxDetail = async (trxID: any) => {
  try {
    const response = await axios.get(
      `${serverURL}/api/transaction-find/${trxID}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTrxStatus = async (trxID: any, newTrxStatus: any) => {
  try {
    const res = await axios.post(
      `${serverURL}/api/update/transaction-status`,
      { trxID, newTrxStatus },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTransList = async () => {
  try {
    const res = await axios.get(`${serverURL}/api/transaction-all`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // console.error(error);
  }
};
