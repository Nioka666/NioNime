/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchRecentAnime } from "@utils/anime";
import { Loading } from "./Loading";
import React from "react";
import { Link } from "react-router-dom";

export const RecommendSlide = () => {
  const [hoveredAnimeId, setHoveredAnimeId] = React.useState<string | null>(
    null
  );

  const handleMouseOver = (animeId: string) => {
    setHoveredAnimeId(animeId);
  };

  const {
    data: animeData,
    error: RecentAnimeError,
    isValidating: isLoadingRecentAnime,
  } = useSWR("recentAnime", () => fetchRecentAnime("anime", 1, 20));

  if (RecentAnimeError) {
    console.error("Error fetching Recent anime data:", RecentAnimeError);
  }

  return (
    <>
      <div className="slide-nime m-top-30" style={{ marginLeft: "17px" }}>
        <div className="left-capt">
          <h3 style={{ marginTop: "-100px" }}>Recommended for you</h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss">
          {isLoadingRecentAnime && <Loading />}
          {!isLoadingRecentAnime &&
            animeData?.map((anime: any) => (
              <Link to={`http://localhost/anime-detail/${anime.id}`} key={anime.id}>
                <div
                  key={anime.id}
                  className={`small-item ${hoveredAnimeId === anime.id ? "hovered" : ""
                    }`}
                  style={{ width: "180px" }}
                  data-anime-id={anime.id}
                  onMouseOver={() => handleMouseOver(anime.id)}
                >
                  <img
                    src={anime.coverImage}
                    className="card-img-top"
                    alt={anime.title.romaji}
                    style={{ height: "270px" }}
                  />

                  {/* Overlay */}
                  <div className="overlay">
                    {isLoadingRecentAnime && <Loading />}
                    {!isLoadingRecentAnime && hoveredAnimeId === anime.id && (
                      <div className="anime-detail">
                        <h6 className="text-normal">
                          {anime?.title.romaji}
                        </h6>
                        <strong>
                          <p className="text-gray fw-bold">
                            Genres: {anime?.genres.slice(0, 2).join(", ")}
                          </p>
                          <br />
                        </strong>
                        <p>{anime?.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="anime-title">
                    <h6>{anime.title.romaji}</h6>
                    <h6 className="text-gray">EP. {anime.currentEpisode}</h6>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
