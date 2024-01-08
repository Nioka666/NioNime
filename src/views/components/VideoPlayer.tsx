/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const VideoPlayer = () => {
  return (
    <>
      <div className="container">
        <video
          id="my-video"
          className="video-js vjs-theme-forest"
          controls
          preload="auto"
          poster="./img/sus.png"
          data-setup="{}"
          width="1100px"
          height="420px"
        >
          <source
            src="https://www048.vipanicdn.net/streamhls/7f8dd00fcdec4483b9ff13f47a3ec4e2/ep.15.1702658198.1080.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </>
  );
};
