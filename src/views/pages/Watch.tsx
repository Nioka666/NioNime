/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { fetchAnimeDetail, fetchAnimeStreamLink } from "@utils/anime";
import { RecommendSlide } from "@views/components/RecommendSlide";
import { useParams } from "react-router-dom";
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import useSWR from "swr";
import { VideoPlayer } from '@views/components/VideoPlayer';
import { CommentInfo } from '@views/components/CommentInfo';
import { ParagraphPlaceholder } from '@views/components/ParagraphPlaceholder';

export interface CustomVideoJsPlayerOptions {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string;
  }[];
}

export const Watch = () => {
  const animeId = useParams();
  const [selectedEpisodes, setSelectedEpisodes] = useState(null);
  // const [player, setPlayer] = useState(null);
  const handleEpisodeClick = (episodeId: any) => {
    setSelectedEpisodes(episodeId);
  };
  const {
    data: animeWatchDetail,
    isValidating: isLoadingAnimeWatchDetail,
  } = useSWR("animeWatchDetail", () => fetchAnimeDetail(animeId.animeId), {
    revalidateOnFocus: false,
  });
  const episodeProvider = animeWatchDetail?.episodes.data;
  const providerIndex = episodeProvider?.findIndex(
    (episode: any) => episode.providerId === 'zoro'
  );
  const currentEpisode = animeWatchDetail?.episodes.data[providerIndex].episodes[0].number;
  const episodeTitle = animeWatchDetail?.episodes.data[providerIndex].episodes[0].title;
  const watchID = animeWatchDetail?.episodes.data[providerIndex].episodes[0].id;
  // const cleanWatchID = watchID?.substring(watchID.indexOf('/') + 1);
  const {
    data: animeStreamLink,
    // error: errorAnimeStreamLink,
  } = useSWR("animeStreamLink", () => fetchAnimeStreamLink(watchID, currentEpisode, animeId?.animeId), {
    revalidateOnFocus: false,
  });

  const resultLink = animeStreamLink?.sources[2].url;
  // if else store
  // if (animeWatchDetailError) {
  //   console.log(animeWatchDetailError);
  // }

  // if (errorAnimeStreamLink) {
  //   console.log(errorAnimeStreamLink);
  // }
  const playerRef = useRef<Player | null>(null);
  const videoJsOptions: CustomVideoJsPlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    sources: [{
      src: resultLink,
      type: 'application/x-mpegURL'
    }]
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
    // video player handle event 
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  console.log(selectedEpisodes);
  return (
    <>
      <div className="container" style={{ marginTop: "55px" }}>
        <br />
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <div
        className="container content-wrappers"
        style={{ display: "flex", margin: "38px 70px", gap: "75px" }}
      >
        <section style={{ width: "690px" }}>
          {isLoadingAnimeWatchDetail && (
            <ParagraphPlaceholder />
          )}
          {!isLoadingAnimeWatchDetail && (
            <>
              <div className="d-flex">
                <h3 className="text-light" style={{ width: "3500px" }} key={animeWatchDetail?.title.romaji}>{animeWatchDetail?.title.romaji}</h3>
                <i className="fa-solid fa-ellipsis-vertical fs-4 mt-2 text-gray" style={{ width: "70px" }}></i>
              </div>
              <h5 className="text-gray" key={episodeTitle}>EP {currentEpisode} - {episodeTitle}</h5>
              <h6 className="text-gray m-top-20" style={{ lineHeight: "23px" }}>
                {animeWatchDetail?.description}
              </h6>
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
                    padding: "10px 10px 10px 365px",
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
                    padding: "10px 10px 10px 365px",
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
                    padding: "10px 10px 10px 365px",
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
          <h4 className="mt-0">Next Episodes</h4>
          <h6 className="text-gray">List of Episodes...</h6>
          <div className="d-flex gap-3 m-top-25" style={{ flexWrap: "wrap" }}>
            {animeWatchDetail?.episodes.data[providerIndex].episodes?.map((episode: any) => (
              <button
                className="btn ep-square rounded-2 text-white"
                style={{
                  cursor: "pointer",
                  width: "70px",
                }}
                key={episode?.id}
                onClick={() => handleEpisodeClick(episode?.number)}
              >
                <h6 style={{ margin: "0px" }} key={episode.number}>EP {episode.number}</h6>
              </button>
            ))}
          </div>
        </section>
      </div>
      <RecommendSlide />
    </>
  );
};
