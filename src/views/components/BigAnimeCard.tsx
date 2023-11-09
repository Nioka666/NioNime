export const BigAnimeCard = () => {
  return (
    <>
      <div className="single-parent-container">
        {/* <div className="single-wrapper"> */}
          <div className="containers">
            <div className="h-100 text-bg-fa-light">
              <img
                src="./img/fireren.jpe"
                className="mx-auto d-block"
                width="580px"
              />
            </div>
            <div className="single-title" style={{ margin: "auto 0" }}>
              <h2>Sousou no Frieren: Beyond Journey's End</h2>
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
                  className="btn btn-lg p-1"
                  type="button"
                >
                  <i className="fa-regular fa-bookmark"></i>
                </button>
                <button
                  id="btn-banner"
                  className="btn btn-lg text-white"
                  type="button"
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  Watch now
                </button>
              </div>
            </div>
          </div>
          <div className="containers">
            <div className="h-100 text-bg-fa-light rounded-3">
              <img
                src="./img/wp12526882-jujutsu-kaisen-season-2-wallpapers.jpg"
                className="mx-auto d-block"
                width="580px"
              />
            </div>
            <div className="single-title" style={{ margin: "auto 0" }}>
              <h2>Jujutsu Kaisen: Season 2</h2>
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
                  className="btn btn-lg p-1"
                  type="button"
                >
                  <i className="fa-regular fa-bookmark"></i>
                </button>
                <button
                  id="btn-banner"
                  className="btn btn-lg text-white"
                  type="button"
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  Watch now
                </button>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};
