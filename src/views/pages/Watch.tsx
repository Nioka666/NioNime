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

export const Watch = () => {
  // const [player, setPlayer] = useState(null);
  const [selectedEpisodes, setSelectedEpisodes] = useState(null);
  const animeId = useParams();

  const handleEpisodeClick = (episodeId: any) => {
    setSelectedEpisodes(episodeId);
  };

  console.log(selectedEpisodes);

  const {
    data: animeWatchDetail,
  } = useSWR("animeWatchDetail", () => fetchAnimeDetail(animeId.animeId), {
    revalidateOnFocus: false,
  });

  const episodeProvider = animeWatchDetail?.episodes.data;
  const providerIndex = episodeProvider?.findIndex(
    (episode: any) => episode.providerId === 'zoro'
  );
  console.info(`index ke ${providerIndex} OK`);

  // const animeStreamId = animeWatchDetail?.episodes.data[providerIndex].episodes.map((ep: any) => {
  //   return ep.id;
  // });
  const currentEpisode = animeWatchDetail?.episodes.data[providerIndex].episodes[0].number;
  const episodeTitle = animeWatchDetail?.episodes.data[providerIndex].episodes[0].title;
  // console.log(currentEpisode);

  const watchID = animeWatchDetail?.episodes.data[providerIndex].episodes[0].id;
  // console.log(watchID);
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
  // Player

  const playerRef = useRef<Player | null>(null);

  interface CustomVideoJsPlayerOptions {
    autoplay: boolean;
    controls: boolean;
    responsive: boolean;
    fluid: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  }

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

    // Anda dapat menangani peristiwa pemutaran di sini, sebagai contoh:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      {/* Video Player */}
      <div className="container" style={{ marginTop: "55px" }}>
        <br />
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <div
        className="container content-wrappers"
        style={{ display: "flex", margin: "38px 70px", gap: "75px" }}
      >
        {/* Anime Detail (Left Session) */}
        <section style={{ width: "690px" }}>
          <div className="d-flex">
            <h3 className="text-light" style={{ width: "3500px" }} key={animeWatchDetail?.title.romaji}>{animeWatchDetail?.title.romaji}</h3>
            <i className="fa-solid fa-ellipsis-vertical fs-4 m-top-10 text-gray" style={{ width: "100px" }}></i>
          </div>
          <h5 className="text-gray" key={episodeTitle}>Title : {episodeTitle}</h5>
          <h6 className="text-gray m-top-20" style={{ lineHeight: "23px" }}>
            {animeWatchDetail?.description}
          </h6>
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

        {/* right section */}
        <section style={{ width: "390px" }}>
          <h4 className="mt-1">Next Episode</h4>
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
