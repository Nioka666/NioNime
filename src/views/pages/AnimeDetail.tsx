/* eslint-disable @typescript-eslint/no-unused-vars */
import {} from "module";
import { useParams } from "react-router-dom";
import { fetchAnimeDetail } from "../../utils/anime";
import useSWR from "swr";

export const AnimeDetail = () => {
  const { animeId } = useParams();
  const { data: animeDetail, error: animeDetailError } = useSWR(
    "animeDetail",
    () => fetchAnimeDetail(animeId)
  );

  if (animeDetailError) {
    console.log(animeDetailError);
  }

  const bannerImage: string | undefined = animeDetail?.bannerImage;

  return (
    <>
      <div
        className="p-5 text-center bg-black"
        style={{
          position: "relative",
          marginTop: "0px",
          backgroundImage: bannerImage ? `url(${bannerImage})` : "none",
          backgroundSize: "cover",
          filter: "brightness(38%)",
          height: "550px",
          zIndex: "-999",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "150px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, 0.689))",
          }}
        ></div>
      </div>

      <div
        className="container profile-page"
        style={{ margin: "-345px 0 0 72px" }}
      >
        {/* <div className="row d-flex"> */}
        <div className="col-lg-4 d-flex w-100 user-wrapper">
          <img
            src={animeDetail?.coverImage}
            width={"230px"}
            className="bd-placeholder-img rounded-1"
            style={{
              border: "0px solid black",
              cursor: "pointer",
              marginTop: "-80px",
            }}
          />
          <div
            className="anime-detail-content"
            style={{
              display: "grid",
              height: "50px",
              marginLeft: "30px",
              gap: "10px",
            }}
          >
            <h4
              className="anime-detail-title"
              style={{
                margin: "-65px 0 0 0px",
                fontWeight: "500",
                fontSize: "42px",
                width: "80%",
              }}
            >
              {animeDetail?.title.romaji} <br />
            </h4>
            <div
              className="status-badge"
              style={{
                display: "flex",
                gap: "10px",
                height: "29px",
              }}
            >
              <span className="anime-detail-span">{animeDetail?.status}</span>
              <span className="anime-detail-span">{animeDetail?.season}</span>
              <span
                className="anime-detail-span"
                style={{ color: "yellow", border: "1px solid yellow" }}
              >
                <i
                  className="fa-solid fa-star"
                  style={{
                    fontSize: "14px",
                    marginRight: "3.5px",
                    fontWeight: "bold",
                  }}
                ></i>
                {animeDetail?.rating.anilist}
              </span>
            </div>
            <div className="btn-groups mt-2">
              <button
                id="btn-banner"
                className="btn btn-lg text-white"
                type="button"
                style={{
                  border: "2px solid gray",
                  width: "215px",
                  padding: "10px 10px",
                  fontSize: "17px",
                }}
              >
                <i
                  className="fa-solid fa-plus"
                  style={{ marginRight: "8px" }}
                ></i>
                Add to Watchlist
              </button>

              <button
                id="btn-banner"
                className="btn btn-lg text-white"
                type="button"
                style={{
                  border: "2px solid #caa800",
                  backgroundColor: "#caa800",
                  width: "165px",
                  padding: "10px 10px",
                  fontSize: "17px",
                  marginLeft: "10px",
                }}
              >
                <i
                  className="fa-solid fa-plus"
                  style={{ marginRight: "8px" }}
                ></i>
                Watch Now
              </button>
            </div>
            <div className="description mt-4" style={{ width: "80%" }}>
              <p style={{ fontSize: "15px" }}>
                {animeDetail?.description.substring(0, 300)}
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="div">
          <br />
          <br />
          <br />
          <br />
          <h1>test</h1>
        </div>
      </div>
    </>
  );
};
