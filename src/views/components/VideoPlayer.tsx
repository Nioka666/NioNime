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
          poster="../../img/sus.png"
          data-setup="{}"
          width="1100px"
          height="420px"
        >
          <source
            src="https://www089.vipanicdn.net/streamhls/0d8ef972359afb5c24ede3155eb6e541/ep.1.1703923090.720.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </>
  );
};
