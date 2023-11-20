export const VideoPlayer = () => {
  return (
    <>
      <div className="container">
        <video
          id="my-video"
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          data-setup="{}"
          width="1100px"
          height="440px"
        >
          <source
            src="https://www041.vipanicdn.net/streamhls/7f8dd00fcdec4483b9ff13f47a3ec4e2/ep.1.1696001423.720.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </>
  );
};
