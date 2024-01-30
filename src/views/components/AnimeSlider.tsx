/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchRecentAnime } from "@utils/anime";
import { Loading } from "./Loading";
import React from "react";
import { ContentDummyLoad } from "./ContentDummyLoad";
import DOMPurify from "dompurify";

export const AnimeSlider = ({ page }: any) => {
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
  } = useSWR("recentAnime", () => fetchRecentAnime("anime", page, 20), {
    revalidateOnFocus: false,
  });

  if (RecentAnimeError) {
    console.error("Error fetching Recent anime data:", RecentAnimeError);
  }

  let savedRecentAnime: any = null;
  const storedTopAnime = localStorage.getItem("recentAnimeData");

  if (storedTopAnime) {
    try {
      savedRecentAnime = JSON.parse(storedTopAnime);
    } catch (error) {
      console.error("Error parsing stored animeStats:", error);
    }
  }

  return (
    <>
      <div className="slide-nime m-top-30">
        <div className="left-capt">
          <h3 style={{ marginTop: "-100px" }}>Recent Updates</h3>
          <h6 className="text-lightgray">October 2023 Ongoings</h6>
        </div>
        <div className="sss">
          {!isLoadingRecentAnime && <Loading /> && (
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
          {savedRecentAnime?.map((anime: any) => (
            <a href={`anime-detail/${anime.id}`} key={anime.id}>
              <div
                key={anime.id}
                className={`item ${
                  hoveredAnimeId === anime.id ? "hovered" : ""
                }`}
                data-anime-id={anime.id}
                onMouseOver={() => handleMouseOver(anime.id)}
              >
                <img
                  src={anime.coverImage}
                  className="card-img-top"
                  alt={anime.title.romaji}
                />

                {/* Overlay */}
                <div className="overlay">
                  {isLoadingRecentAnime && <Loading />}
                  {!isLoadingRecentAnime && hoveredAnimeId === anime.id && (
                    <div className="anime-detail">
                      <h6 className="text-normal">{anime?.title.romaji}</h6>
                      <strong>
                        <p className="text-gray fw-bold">
                          Genres: {anime?.genres.slice(0, 2).join(", ")}
                        </p>
                        <br />
                      </strong>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(anime?.description),
                        }}
                      ></p>
                    </div>
                  )}
                </div>

                <div className="anime-title">
                  <h6>{anime.title.romaji}</h6>
                  <h6 className="text-gray">EP. {anime.currentEpisode}</h6>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
