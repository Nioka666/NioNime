import { CarouselHeader } from "@components/Carousels";
import { Pricing } from "@components/Pricing";

const Features = () => {
  return (
    <>
      <div
        className="containers"
        style={{
          marginTop: "100px",
          backgroundColor: "#000000",
          zIndex: "999",
          padding: "0 92px",
          // border: "2px solid white",
        }}
      >
        <div
          className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5"
          style={{
            // border: "2px solid white",
            boxShadow: "0px -70px 90px black",
          }}
        >
          <div
            className="col d-flex flex-column align-items-start gap-2"
            style={{}}
          >
            <h2 className="fw-bold text-white">
              Left-aligned title explaining these awesome features
            </h2>
            <p className="text-gray">
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a href="#" className="btn btn-warning btn-lg">
              warning button
            </a>
          </div>

          <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-bolt-lightning p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Fast</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-sack-dollar p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Good Offers</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-ban p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">No Ads</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-fire p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Updates</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const About = () => {
  return (
    <>
      <CarouselHeader>
        <div className="carousel-item active">
          <img src="./img/jjk0.jpg" className="d-block w-100" />
          <div
            className="carousel-overlay"
            style={{
              justifyContent: "center",
              marginTop: "0px",
              alignItems: "center",
              zIndex: "999"
            }}
          >
            <div className="inner-overlay" style={{ backdropFilter: "unset" }}>
              <h1
                className="display-3 fw-bold text-light"
                style={{ textAlign: "center", textShadow: "0 0 80px black" }}
              >
                A Free Place <br /> Anime Stream Collections
              </h1>

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{ borderRadius: "0px", margin: "0 0 0 170px", zIndex: "999" }}
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  PREMIUM PLANS
                </button>
              </div>
            </div>
          </div>
        </div>
      </CarouselHeader>
      <Features />
      <Pricing />
    </>
  );
};
