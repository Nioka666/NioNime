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
            src="https://www052.vipanicdn.net/streamhls/ecc2755b350b6e32b2db08131e1f921e/ep.10.1686088923.720.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </>
  );
};
