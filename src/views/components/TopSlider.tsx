/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchTopAnimeData, fetchAnimeDetail } from "@utils/anime";
import { Loading } from "./Loading";
import React from "react";
import { Link } from "react-router-dom";

export const TopSlider: React.FC = () => {
  const [hoveredAnimeId, setHoveredAnimeId] = React.useState<string | null>(
    null
  );

  const handleMouseOver = (animeId: string) => {
    setHoveredAnimeId(animeId);
  };

  const {
    data: animeData,
    error: topAnimeError,
    isValidating: isLoadingTopAnime,
  } = useSWR("topAnime", () => fetchTopAnimeData());

  const {
    data: animeDetail,
    error: detailError,
    isValidating: isLoadingDetail,
  } = useSWR(
    hoveredAnimeId ? `animeDetail-${hoveredAnimeId}` : null,
    () => fetchAnimeDetail(hoveredAnimeId || ""),
    {
      revalidateOnFocus: false,
    }
  );

  if (topAnimeError) {
    console.error("Error fetching top anime data:", topAnimeError);
  }

  if (detailError) {
    console.error("Error fetching anime detail:", detailError);
  }

  return (
    <>
      <div className="slide-nime m-top-80">
        <div className="top-capt">
          <h3>Top Airing</h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss">
          {isLoadingTopAnime && <Loading />}
          {!isLoadingTopAnime &&
            animeData?.top.map((anime: any) => (
              <Link to={`anime-detail/${anime.id}`} key={anime.id}>
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
                    {isLoadingDetail && <Loading />}
                    {!isLoadingDetail && hoveredAnimeId === anime.id && (
                      <div className="anime-detail" key={anime.id}>
                        <h6 className="fw-normal">
                          {animeDetail?.title.romaji}
                        </h6>
                        <strong>
                          <p className="text-lights fw-bold">
                            Rating: {animeDetail?.rating.anilist}
                          </p>
                          <p className="text-gray fw-bold">
                            {animeDetail?.status}
                          </p>
                          <br />
                        </strong>
                        <p>{animeDetail?.description}</p>
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
