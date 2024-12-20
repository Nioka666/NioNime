/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { fetchUserMembershipData } from "@utils/anime";
// import useSWR from "swr";
import { CarouselHeader } from "@components/Carousels";
import { Pricing } from "@components/Pricing";
import ProgressLoad from "@views/components/ProgressLoad";
import { useEffect, useState } from "react";

const Features = () => {
  return (
    <>
      <div
        className="containers"
        style={{
          position: "relative",
          marginTop: "10px",
          backgroundColor: "#000000",
          zIndex: "1",
          padding: "0 92px",
        }}
      >
        <div
          className="row row-cols-1 row-cols-md-2 align-items-md-center"
          style={{
            // border: "2px solid white",
            marginTop: "150px",
            boxShadow: "0px -70px 90px black",
          }}
        >
          <div className="col d-flex flex-column align-items-start gap-3">
            <h2 className="fw-bold text-white">
              Left arms title
              <br /> test lorem lotius the old
            </h2>
            <p className="text-gray">
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
          </div>

          <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-4 w-25">
                  <i className="fa-solid fa-bolt-lightning p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Fast</h4>
                <p className="text-gray">Fast performance</p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-4 w-25">
                  <i className="fa-solid fa-sack-dollar p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Good Offers</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-4 w-25">
                  <i className="fa-solid fa-ban p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">No Ads</h4>
                <p className="text-gray">Enjoy Streaming without ads</p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-4 w-25">
                  <i className="fa-solid fa-fire p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Updates</h4>
                <p className="text-gray">Updates anime information everyday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const About = () => {
  const [loading, setLoading] = useState(true);
  localStorage.setItem("redirectPath", window.location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProgressLoad />;
  }

  const handleScroll = (target: string) => {
    const pricingElement = document.getElementById(target);
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <CarouselHeader>
        <div className="carousel-item active">
          <img src="./img/jjk0.jpg" className="d-block w-100 z-0" />
          <div className="carousel-overlay caro-about">
            <div className="inner-overlay" style={{ backdropFilter: "unset" }}>
              <h1 className="display-3 fw-bold text-lights">
                A Free Place <br /> Anime Stream Collections
              </h1>

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  onClick={() => handleScroll("pricing")}
                  style={{
                    borderRadius: "0px",
                    margin: "0 0 0 170px",
                    zIndex: "999",
                  }}
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
      <br />
      <br />
      <br />
      <Pricing />
      <br />
    </>
  );
};
