/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

export const CarouselHeader: React.FC<any> = (props) => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide vignette"
      data-bs-ride="carousel"
      style={{ height: "590px", position: "relative", marginTop: "40px" }}
    >
      <div
        className="carousel-inner"
        style={{ height: "700px", marginTop: "-40px", zIndex: "0" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export const ImgCarousel: React.FC<{ src: string }> = (props) => {
  return <img src={props.src} className="d-block w-100" alt="carousel-item" />;
};

export const Carousels: React.FC = () => {
  return (
    <>
      <CarouselHeader>
        {/* Items */}
        <div className="carousel-item">
          <div className="hero-bg">
            <picture>
              <source srcSet="./img/zom100.jpg" media="(min-width: 1920px)" />
              <source
                srcSet="./img/zom100_potrait.jpg"
                media="(max-width: 760px)"
              />
              <ImgCarousel src="./img/zom100.jpg" />
            </picture>
            <picture>
              <ImgCarousel src="./img/zom100_potrait.jpg" />
            </picture>
          </div>
          {/* overlay */}
          <div className="carousel-overlay">
            <div className="inner-overlay">
              <h1 className="display-3 fw-bold">
                Zom 100:
                <br /> Bucket List..
              </h1>
              <p>
                "Zom 100 - Official Released Announced
                <br /> Coming for 2024
              </p>
              <p>
                <span className="text-warning fw-bold">Genres</span> Mystery,
                Drama
              </p>

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "transparent",
                  }}
                >
                  <i className="fa-regular fa-bookmark fa-lg text-warning"></i>
                </button>
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{}}
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  WATCH NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="hero-bg">
            <picture>
              <source srcSet="./img/aiai.png" media="(min-width: 1920px)" />
              <source
                srcSet="./img/aikane_potrait.jpeg"
                media="(max-width: 760px)"
              />
              <ImgCarousel src="./img/aiai.png" />
            </picture>
            <picture>
              <ImgCarousel src="./img/aikane_potrait.jpeg" />
            </picture>
          </div>
          
          {/* overlay */}
          <div className="carousel-overlay">
            <div className="inner-overlay">
              <h1 className="display-3 fw-bold">
                [ 推しの子 ]<br /> Oshi no Ko.
              </h1>
              <p>
                "Oshi no Ko - Official Released Coming for 2024
              </p>
              <p>
                <span className="text-warning fw-bold">Genres</span> Mystery,
                Drama
              </p>

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "transparent",
                  }}
                >
                  <i className="fa-regular fa-bookmark fa-lg text-warning"></i>
                </button>
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{}}
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  WATCH NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item active">
          <div className="hero-bg">
            <div className="hero-bg">
              <picture>
                <source srcSet="./img/peakpx.jpg" media="(min-width: 1920px)" />
                <source
                  srcSet="./img/peakpx_potrait.jpg"
                  media="(max-width: 760px)"
                />
                <ImgCarousel src="./img/peakpx.jpg" />
              </picture>
              <picture>
                <ImgCarousel src="./img/peakpx_potrait.jpg" />
              </picture>
            </div>
          </div>
          {/* overlay */}
          <div className="carousel-overlay">
            <div className="inner-overlay">
              <h1 className="display-3 fw-bold">
                A.O.T <br /> Final Season
              </h1>
              <p>
                Attack On Titan - Official Released
                <br /> Coming for 2024
              </p>
              <p>
                <span className="text-warning fw-bold">Genres</span> Mystery,
                Drama
              </p>

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "transparent",
                  }}
                >
                  <i className="fa-regular fa-bookmark fa-lg text-warning"></i>
                </button>
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{}}
                >
                  <i
                    className="fa-solid fa-play"
                    style={{ marginRight: "14px" }}
                  ></i>
                  WATCH NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </CarouselHeader>
      {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleSlidesOnly"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button> */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleSlidesOnly"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </>
  );
};
