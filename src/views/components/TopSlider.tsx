/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { fetchTopAnimeData, fetchAnimeDetail } from "../../utils/anime";
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
  } = useSWR("topAnime", () => fetchTopAnimeData(2));

  const {
    data: animeDetail,
    error: detailError,
    isValidating: isLoadingDetail,
  } = useSWR(
    hoveredAnimeId ? `animeDetail-${hoveredAnimeId}` : null,
    () => fetchAnimeDetail(hoveredAnimeId || ""),
    { revalidateOnFocus: false }
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
          <h3>
            <i
              className="fa-solid fa-crown text-warning"
              style={{ marginRight: "10px" }}
            ></i>
            Top Airing
          </h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss">
          {isLoadingTopAnime && <Loading />}
          {!isLoadingTopAnime &&
            animeData?.results.map((anime: any) => (
              <Link to={`anime-detail/${anime.id}`}>
                <div
                  className={`item ${
                    hoveredAnimeId === anime.id ? "hovered" : ""
                  }`}
                  key={anime.id}
                  data-anime-id={anime.id}
                  onMouseOver={() => handleMouseOver(anime.id)}
                >
                  <img
                    src={anime.image}
                    className="card-img-top"
                    alt={anime.title}
                  />
                  {/* Overlay */}
                  <div className="overlay">
                    {isLoadingDetail && <Loading />}
                    {!isLoadingDetail && hoveredAnimeId === anime.id && (
                      <div className="anime-detail">
                        <h6 className="fw-normal">{animeDetail?.title}</h6>
                        <strong>
                          <p className="text-gray fw-bold">
                            {animeDetail?.totalEpisodes} Episodes
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
                    <h6>{anime.title}</h6>
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
