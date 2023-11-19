export const BigAnimeCard = () => {
  return (
    <>
      <div
        className="single-parent-container"
        style={{ marginBottom: "110px" }}
      >
        <div className="containers">
          <div className="h-100 text-bg-fa-light rounded-3 show-image-card">
            <img src="./img/kamino.jpe" className="mx-auto d-block" />
          </div>
          <div className="single-title" style={{ margin: "auto 0" }}>
            <h2>KamiErabi GOD.app</h2>
            <h6
              style={{ color: "gray", marginTop: "20px", fontWeight: "bold" }}
            >
              Genres Drama, Mystery
            </h6>
            <h6 className="text-lights fw-normal">
              The ultimate battle royale for divinity has begun. High schoolers
              must use their unique powers to compete against each other for the
              coveted title “God.”
            </h6>
            <div className="btn-group mt-4 gap-2">
              <button
                id="btn-banner"
                className="btn btn-lg text-white"
                type="button"
              >
                <i className="fa-solid fa-plus"></i>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
        <div className="containers">
          <div className="h-100 text-bg-fa-light show-image-card">
            <img
              src="./img/fireren.jpe"
              className={`mx-auto d-block anime-image-show`}
            />
            {/* <div className="overlay-img-show-text">Play Now</div> */}
          </div>
          <div className="single-title">
            <h2>Sousou no Frieren: Beyond ..</h2>
            <h6
              style={{ color: "gray", marginTop: "20px", fontWeight: "bold" }}
            >
              Genres Drama, Mystery
            </h6>
            <h6 className="text-lights fw-normal">
              After the party of heroes defeated the Demon King, they restored
              peace to the land and returned to lives of solitude. Generations
              pass..
            </h6>
            <div className="btn-group mt-4 gap-2">
              <button
                id="btn-banner"
                className="btn btn-lg text-white"
                type="button"
              >
                <i className="fa-solid fa-plus"></i>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
