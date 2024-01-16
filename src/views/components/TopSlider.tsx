/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR, { mutate } from "swr";
import { fetchTopAnimeData } from "@utils/anime";
import { Loading } from "./Loading";
import React from "react";
import { Link } from "react-router-dom";
import { ContentDummyLoad } from "./ContentDummyLoad";

export const TopSlider: React.FC = () => {
  const [hoveredAnimeId, setHoveredAnimeId] = React.useState<string | null>(
    null
  );

  const handleMouseOver = async (animeId: string) => {
    setHoveredAnimeId(animeId);

    const cacheKey = `animeDetail-${animeId}`;
    const cachedData = await mutate(cacheKey, fetchTopAnimeData(), false);
    if (!cachedData) {
      await mutate(cacheKey);
    }
  };

  const handleClick = () => {
    const pageRefreshed = localStorage.getItem('pageRefreshed') === 'true';

    if (!pageRefreshed) {
      localStorage.setItem('pageRefreshed', 'true');
      window.location.reload();
    }
  };

  const {
    data: animeData,
    error: topAnimeError,
    isValidating: isLoadingTopAnime,
  } = useSWR("topAnime", () => fetchTopAnimeData(), {
    revalidateOnFocus: false,
  });

  if (topAnimeError) {
    console.error("Error fetching top anime data:", topAnimeError);
  }

  return (
    <>
      <div className="slide-nime m-top-80">
        <div className="top-capt">
          <h3>Top Airing</h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss" style={{ backgroundColor: "#0000008c", boxShadow: "10px -10px 15px #0000008c" }}>
          {isLoadingTopAnime && <Loading /> && (
            <>
              <ContentDummyLoad />
              <ContentDummyLoad />
              <ContentDummyLoad />
              <ContentDummyLoad />
              <ContentDummyLoad />
              <ContentDummyLoad />
              <ContentDummyLoad />
            </>
          )}
          {!isLoadingTopAnime &&
            animeData?.top.map((anime: any) => (
              <Link to={`anime-detail/${anime.id}`} key={anime.id} onClick={handleClick}>
                <div
                  className={`item ${hoveredAnimeId === anime.id ? "hovered" : ""
                    }`}
                  key={anime.id}
                  data-anime-id={anime.id}
                  onMouseOver={() => handleMouseOver(anime.id)}
                >
                  <img
                    src={anime.coverImage}
                    className="card-img-top"
                    alt={anime.title.romaji}
                  />
                  <div className="overlay">
                    {isLoadingTopAnime && <Loading />}
                    {!isLoadingTopAnime && hoveredAnimeId === anime.id && (
                      <div className="anime-detail" key={anime.id}>
                        <h6 className="fw-normal">
                          {anime?.title.romaji}
                        </h6>
                        <strong>
                          <p className="text-lights fw-bold">
                            Genres: {anime?.genres[1]}
                          </p>
                          <br />
                        </strong>
                        <p>{anime?.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="anime-title">
                    <h6>{anime.title.romaji}</h6>
                    <h6 className="text-gray">
                      {anime.genres.slice(0, 2).join(", ")}
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
