import { CarouselHeader } from "@components/Carousels";
import { Features } from "@components/Features";
import { Pricing } from "@components/Pricing";

export const About = () => {
  return (
    <>
      <CarouselHeader>
        {/* Items */}
        <div className="carousel-item active">
          <img src="./img/jjk0.jpg" className="d-block w-100" />
          {/* overlay */}
          <div
            className="carousel-overlay"
            style={{
              justifyContent: "center",
              marginTop: "0px",
              alignItems: "center",
            }}
          >
            <div className="inner-overlay" style={{ backdropFilter: "unset" }}>
              <h1
                className="display-3 fw-bold text-gray"
                style={{ textAlign: "center", textShadow: "0 0 80px black" }}
              >
                a Free Place <br /> Anime Stream Collections
              </h1>
              {/* <p>
                Attack On Titan - Official Released
                <br /> Coming for 2024
              </p> */}

              <div className="btn-group">
                <button
                  id="btn-banner"
                  className="btn btn-lg"
                  type="button"
                  style={{ borderRadius: "0px", margin: "0 0 0 170px" }}
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
