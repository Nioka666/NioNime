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
          style={{ width: "100%" }}
        >
          <source
            src="https://www002.vipanicdn.net/streamhls/0789fd4f049c3ca2a49b860ea5d1f456/ep.1.1677591537.360.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </>
  );
};
