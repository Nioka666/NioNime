/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  fetchAnimeDetail,
  fetchAnimeStreamLink,
  fetchUserData,
  serverURL,
} from "@utils/anime";
import { RecommendSlide } from "@views/components/RecommendSlide";
import { useParams } from "react-router-dom";
import Player from "video.js/dist/types/player";
import useSWR from "swr";
import DOMPurify from "dompurify";
import { CommentInfo } from "@views/components/CommentInfo";
import { ParagraphPlaceholder } from "@views/components/ParagraphPlaceholder";
import EpisodesPagination from "@views/components/EpisodePagination";
import { PlayerVid } from "./VideoPlayer";
import axios from "axios";

interface WatchProps {}

export const Watch: React.FC<WatchProps> = () => {
  const { animeId } = useParams();
  const { data: currentUser } = useSWR(
    "fetchCurrentUser",
    () => fetchUserData(),
    { revalidateOnFocus: false }
  );
  const { data: userDetail } = useSWR(
    "fetchUserDetail",
    () =>
      axios
        .post(
          `${serverURL}/api/user-details`,
          { userIDs: currentUser?.id },
          { withCredentials: true }
        )
        .then((response) => response.data),
    { revalidateOnFocus: true }
  );
  const [selectedEpisode, setSelectedEpisode] = useState(null || "");
  const [selectedQuality, setSelectedQuality] = useState(null || "" || Number);
  const [selectedSource, setSelectedSource] = useState(null || "");
  const { data: animeWatchDetail, isValidating: isLoadingAnimeWatchDetail } =
    useSWR("animeWatchDetail", () => fetchAnimeDetail(animeId), {
      revalidateOnFocus: false,
    });
  const episodeProvider = animeWatchDetail?.episodes.data;
  const providerIndex = episodeProvider?.findIndex(
    (episode: any) => episode.providerId === "gogoanime"
  );
  const episodesStore =
    animeWatchDetail?.episodes.data[providerIndex]?.episodes;
  const episodeTitle = episodesStore?.[0]?.title;
  const watchID =
    animeWatchDetail?.episodes?.data[providerIndex]?.episodes[0]?.id;
  const currentEpisode = episodesStore?.[0]?.number;
  const { data: animeStreamLink } = useSWR(
    "animeStreamLink",
    () => fetchAnimeStreamLink(watchID, currentEpisode, animeId),
    {
      revalidateOnFocus: false,
    }
  );

  const playerRef = useRef<Player | null>(null);

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const newEpisodeSrc = await fetchEpisodeData(selectedEpisode);
      setSelectedSource(newEpisodeSrc);
    };

    fetchData();
  }, [selectedQuality, selectedEpisode]);

  const fetchEpisodeData = async (episodeId: any) => {
    const finalEpisodeID = episodeId + 1;
    const watchID =
      animeWatchDetail?.episodes.data[providerIndex].episodes[episodeId].id;
    const newEpisodeData = await fetchAnimeStreamLink(
      watchID,
      finalEpisodeID,
      animeId
    );

    return newEpisodeData?.sources[allowedQualityIndices[selectedQuality]]?.url;
  };

  const handleEpisodeClick = async (episodeId: any) => {
    setSelectedEpisode(episodeId);

    const newEpisodeSrc = await fetchEpisodeData(episodeId);
    setSelectedSource(newEpisodeSrc);
    // console.log(newEpisodeSrc);
  };

  let allowedQualityIndices = [0, 1, 2, 3];
  if (
    userDetail?.membership_level !== "Noble Fans" &&
    userDetail?.membership_level !== "Ordinary Fans"
  ) {
    allowedQualityIndices = [0, 1, 2];
  }

  const streamLinks = animeStreamLink?.sources
    ?.filter((_: any, index: any) => allowedQualityIndices.includes(index))
    ?.map((links: any) => links);

  const handleQualityClick = (qualityIndex: any) => {
    setSelectedQuality(parseInt(qualityIndex, 10));
    console.log(streamLinks[qualityIndex]?.quality);
  };

  let selectedEP = selectedEpisode + 1;

  return (
    <>
      <div className="container" style={{ marginTop: "90px" }}>
        <PlayerVid src={selectedSource} onReady={handlePlayerReady} />
      </div>
      <div
        className="container content-wrappers"
        style={{ display: "flex", margin: "38px 70px", gap: "75px" }}
      >
        <section style={{ width: "690px" }}>
          {isLoadingAnimeWatchDetail && <ParagraphPlaceholder />}
          {!isLoadingAnimeWatchDetail && (
            <>
              <div className="d-flex watch-header">
                <h3
                  className="text-light"
                  style={{ width: "3500px" }}
                  key={animeWatchDetail?.title.romaji}
                >
                  {animeWatchDetail?.title.romaji}
                </h3>
                <select
                  className="form-control bg-dark border-0 text-light"
                  name="quality"
                  id="quality"
                  onChange={(e) => handleQualityClick(e.target.value)}
                  value={selectedQuality}
                >
                  {streamLinks?.map((oneLink: any, index: number) => (
                    <option className="form-control" value={index} key={index}>
                      {oneLink?.quality}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-ellipsis-vertical fs-4 mt-2 text-gray"></i>
              </div>
              <h5 className="text-gray" key={episodeTitle}>
                EP {selectedEP} - {animeWatchDetail?.title.native}
              </h5>
              <h6
                className="text-gray m-top-20"
                style={{ lineHeight: "23px" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(animeWatchDetail?.description),
                }}
              ></h6>
            </>
          )}
          <br />
          <br />
          <table style={{ borderCollapse: "collapse", border: "none" }}>
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "10px 188.3px 10px 5px",
                    fontSize: "16px",
                  }}
                >
                  Status
                </th>
                <th
                  scope="col"
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "10px 10px 10px 360px",
                    fontSize: "14px",
                    color: "lightgray",
                  }}
                  key={animeWatchDetail?.status}
                >
                  {animeWatchDetail?.status}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  scope="row"
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "17px 188.3px 10px 5px",
                    fontSize: "16px",
                  }}
                >
                  Average Ratings
                </td>
                <td
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "10px 10px 10px 360px",
                    fontSize: "14px",
                    color: "lightgray",
                  }}
                >
                  {animeWatchDetail?.averageRating}
                </td>
              </tr>
              <tr>
                <td
                  scope="row"
                  style={{
                    padding: "17px 188.3px 10px 5px",
                    fontSize: "16px",
                  }}
                >
                  Subtitles
                </td>
                <td
                  style={{
                    padding: "10px 10px 10px 360px",
                    fontSize: "14px",
                    color: "lightgray",
                  }}
                >
                  English
                </td>
              </tr>
            </tbody>
          </table>
          <CommentInfo />
        </section>
        <section style={{ width: "390px" }}>
          <EpisodesPagination
            episodes={
              animeWatchDetail?.episodes.data[providerIndex]?.episodes || []
            }
            onEpisodeClick={handleEpisodeClick}
            currentEpisodeIndex={selectedEpisode}
          />
        </section>
      </div>
      <RecommendSlide />
    </>
  );
};
