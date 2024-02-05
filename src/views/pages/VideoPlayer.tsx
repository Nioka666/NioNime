/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import poster from "../../../public/img/stream_poster.jpg";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export const PlayerVid = ({ src }: any) => {
  let player: any = useRef<MediaPlayerInstance>(null);

  // useEffect(() => {
  //   return player.current!.subscribe(({ paused, viewType }: any) => {
  //     console.log("is paused?", "->", paused);
  //     console.log("is audio view?", "->", viewType === "audio");
  //   });
  // }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    _nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  function onCanPlay(
    _detail: MediaCanPlayDetail,
    _nativeEvent: MediaCanPlayEvent
  ) {
    // ...
  }

  return (
    <>
      <MediaPlayer
        className="player"
        title="Sprite Fight"
        src={src}
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
        aspectRatio="16/6.5"
      >
        <MediaProvider>
          <Poster className="vds-poster" src={poster} alt=""/>
        </MediaProvider>

        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails={poster} />
      </MediaPlayer>
    </>
  );
};
