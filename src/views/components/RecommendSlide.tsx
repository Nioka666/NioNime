/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchAnimeDetail, fetchRecentAnime } from "@utils/anime";
import { Loading } from "./Loading";
import React from "react";

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
  } = useSWR("recentAnime", () => fetchRecentAnime("anime", 1, 12));

  const {
    data: animeDetail,
    error: detailError,
    isValidating: isLoadingDetail,
  } = useSWR(
    hoveredAnimeId ? `animeDetail-${hoveredAnimeId}` : null,
    () => fetchAnimeDetail(hoveredAnimeId || ""),
    { revalidateOnFocus: false }
  );

  if (RecentAnimeError) {
    console.error("Error fetching Recent anime data:", RecentAnimeError);
  }

  if (detailError) {
    console.error("Error fetching anime detail:", detailError);
  }
  return (
    <>
      <div className="slide-nime m-top-30">
        <div className="left-capt">
          <h3 style={{ marginTop: "-100px" }}>
            Recent Updates
          </h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss">
          {isLoadingRecentAnime && <Loading />}
          {!isLoadingRecentAnime &&
            animeData?.results.map((anime: any) => (
              <div
                key={anime.id}
                className={`item ${
                  hoveredAnimeId === anime.id ? "hovered" : ""
                }`}
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
                      <h6 className="text-normal">{animeDetail?.title}</h6>
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
                  <h6 className="text-gray">EP. {anime.episodeNumber}</h6>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
