/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { fetchAnimeDetail, fetchAnimeStreamLink } from "@utils/anime";
import { RecommendSlide } from "@views/components/RecommendSlide";
import { useParams } from "react-router-dom";
import Player from 'video.js/dist/types/player';
import useSWR from "swr";
import DOMPurify from 'dompurify';
import { VideoPlayer } from '@views/components/VideoPlayer';
import { CommentInfo } from '@views/components/CommentInfo';
import { ParagraphPlaceholder } from '@views/components/ParagraphPlaceholder';
import EpisodesPagination from '@views/components/EpisodePagination';

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
interface WatchProps { }

export const Watch: React.FC<WatchProps> = () => {
  const { animeId } = useParams();
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  console.log(selectedEpisode);

  const {
    data: animeWatchDetail,
    isValidating: isLoadingAnimeWatchDetail,
  } = useSWR("animeWatchDetail", () => fetchAnimeDetail(animeId), {
    revalidateOnFocus: false,
  });

  const episodeProvider = animeWatchDetail?.episodes.data;
  const providerIndex = episodeProvider?.findIndex(
    (episode: any) => episode.providerId === 'gogoanime'
  );

  const episodesStore = animeWatchDetail?.episodes.data[providerIndex]?.episodes;
  const currentEpisode = episodesStore?.[0]?.number;
  const episodeTitle = episodesStore?.[0]?.title;

  const watchID = animeWatchDetail?.episodes?.data[providerIndex]?.episodes[0]?.id;
  console.log(watchID);

  const {
    data: animeStreamLink,
  } = useSWR("animeStreamLink", () => fetchAnimeStreamLink(watchID, currentEpisode, animeId), {
    revalidateOnFocus: false,
  });

  const resultLink = animeStreamLink?.sources[3].url;
  console.log(animeStreamLink?.sources);
  const playerRef = useRef<Player | null>(null);

  const videoJsOptions: CustomVideoJsPlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    sources: [{
      src: resultLink,
      type: 'application/x-mpegURL',
    }],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  const fetchEpisodeData = async (episodeId: any) => {
    // Fetch data episode baru berdasarkan episodeId
    const watchID = animeWatchDetail?.episodes.data[providerIndex].episodes[episodeId].id;
    console.log(watchID);
    const newEpisodeData = await fetchAnimeStreamLink(watchID, episodeId, animeId);
    return newEpisodeData?.sources[3]?.url || null;
  };

  const handleEpisodeClick = async (episodeId: any) => {
    setSelectedEpisode(episodeId);
    // console.log(episodeId);

    const newEpisodeSrc = await fetchEpisodeData(episodeId);
    // console.log(newEpisodeSrc);

    const newVideoJsOptions = {
      ...videoJsOptions,
      sources: [{
        src: newEpisodeSrc,
        type: 'application/x-mpegURL',
      }],
    };

    if (playerRef.current) {
      playerRef.current.src(newVideoJsOptions.sources);

      playerRef.current.one('waiting', () => {
        console.log('player is waiting');
      });

      playerRef.current.one('canplay', () => {
        console.log('player can play');
      });
    }
  };

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
              <h5 className="text-gray" key={episodeTitle}>EP {selectedEpisode + 1} - {animeWatchDetail?.title.native}</h5>
              <h6
                className="text-gray m-top-20"
                style={{ lineHeight: "23px" }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(animeWatchDetail?.description) }}
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
        <section style={{ width: '390px' }}>
          <EpisodesPagination
            episodes={animeWatchDetail?.episodes.data[providerIndex]?.episodes || []}
            onEpisodeClick={handleEpisodeClick}
            currentEpisodeIndex={selectedEpisode}
          />
        </section>
      </div>
      <RecommendSlide />
    </>
  );
};
