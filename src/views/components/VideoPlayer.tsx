/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { StreamLoading } from './Loading';
import 'video.js/dist/video-js.css';
import '../../style/VideoPlayer.css';

interface VideoJSProps {
  options: any;
  onReady?: (player: Player) => void;
}

export const VideoPlayer: React.FC<VideoJSProps> = (props) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const { options, onReady } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video");

      videoElement.classList.add('vjs-big-play-centered');
      // videoElement.classList.add('vjs-theme-fantasy');
      videoElement.style.width = "100%";
      videoElement.style.height = "100%";
      videoRef.current!.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        ...options,
        errorDisplay: false,
      }, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      player.on('waiting', () => {
        setLoading(true);
      });

      player.on('canplay', () => {
        setLoading(false);
      });

    } else {
      const player = playerRef.current;

      player!.autoplay(options.autoplay);
      player!.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className='video-js vjs-theme-fantasy' style={{ width: "1100px", height: "420px" }}>
      {loading && <StreamLoading />}
      <div ref={videoRef} />
    </div>
  );
};

