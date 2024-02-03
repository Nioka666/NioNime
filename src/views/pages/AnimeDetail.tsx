/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {} from "module";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeDetail } from "../../utils/anime";
import useSWR from "swr";
import { RecommendSlide } from "@views/components/RecommendSlide";
// import { Loading } from "@views/components/Loading";
import DOMPurify from "dompurify";
import { ContentDummyLoadXL } from "@views/components/ContentDummyLoad";

export const AnimeDetail = () => {
  const { animeId } = useParams();
  const {
    data: animeDetail,
    error: animeDetailError,
    isValidating: isLoadingAnimeDetail,
  } = useSWR("animeDetail", () => fetchAnimeDetail(animeId), {
    revalidateOnFocus: false,
  });

  // const episodeMapping = () => {
  //   try {
  //     // console.log(animeDetail?.episodes.data[1].episodes[10].id);
  //     const apiKey = animeDetail?.episodes.data[1].episodes
  //     apiKey?.map((ep: any) => {
  //       console.log(ep);
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  if (animeDetailError) {
    console.log(animeDetailError);
  }

  const bannerImage: string | undefined = animeDetail?.bannerImage;

  return (
    <>
      <div
        className="p-5 text-center bg-black banner-wrapper"
        style={{
          backgroundImage: bannerImage ? `url(${bannerImage})` : "none",
          // filter: "blur(10px)",
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
      {isLoadingAnimeDetail && <ContentDummyLoadXL />}
      {!isLoadingAnimeDetail && (
        <div
          className="container profile-page"
          style={{ margin: "-345px 0 0 72px" }}
        >
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
                marginTop: "-80px",
                height: "50px",
                marginLeft: "30px",
                gap: "0px",
              }}
            >
              <h6
                className="text-gray"
                style={{ fontWeight: "bold", marginTop: "3px" }}
              >
                {animeDetail?.type} - {animeDetail?.format}
              </h6>
              <h4
                className="anime-detail-title"
                style={{
                  margin: "0px 0 10px 0px",
                  fontWeight: "500",
                  fontSize: "38px",
                  width: "80%",
                }}
              >
                {animeDetail?.title.romaji.substring(0, 100)} <br />
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
                  style={{ color: "#caa800", border: "1px solid #caa800" }}
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

              <div className="description mt-4" style={{ width: "80%" }}>
                <p
                  style={{ fontSize: "15px" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      DOMPurify.sanitize(
                        animeDetail?.description.substring(0, 210)
                      ) + ". . .",
                  }}
                ></p>
              </div>

              <div className="btn-groups mt-3">
                <button
                  id="btn-banner"
                  className="btn btn-lg text-white"
                  type="button"
                  style={{
                    border: "2px solid gray",
                    width: "215px",
                    padding: "10px 10px",
                    fontSize: "17px",
                    borderRadius: "0px",
                    zIndex: "999",
                  }}
                >
                  <i
                    className="fa-solid fa-plus"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Add to Watchlist
                </button>

                <Link to={`http://localhost/watch/${animeDetail?.id}`}>
                  <button
                    id="btn-banner"
                    className="btn btn-lg text-black"
                    type="button"
                    style={{
                      border: "2px solid #caa800",
                      backgroundColor: "#caa800",
                      width: "165px",
                      padding: "10px 10px",
                      fontSize: "17px",
                      marginLeft: "10px",
                      fontWeight: "500",
                      borderRadius: "0px",
                    }}
                  >
                    <i
                      className="fa-solid fa-play"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Watch Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="anime-detail-wrapper"
            style={{ display: "flex", gap: "47px" }}
          >
            <div
              className="more-detail"
              style={{ width: "730px", zIndex: "-1" }}
            >
              <br />
              <br />
              <h3>More details</h3>
              <br />
              <table style={{ borderCollapse: "collapse", border: "none" }}>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "10px 188.3px 10px 5px",
                        fontSize: "16px",
                      }}
                    >
                      Studio
                    </th>
                    <th
                      scope="col"
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "10px 10px 10px 365px",
                        fontSize: "14px",
                        color: "lightgray",
                      }}
                    >
                      Bones Inc.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      scope="row"
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "17px 188.3px 10px 5px",
                        fontSize: "16px",
                      }}
                    >
                      Subtitles
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "10px 10px 10px 365px",
                        fontSize: "14px",
                        color: "lightgray",
                      }}
                    >
                      English
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "17px 188.3px 10px 5px",
                        fontSize: "16px",
                      }}
                    >
                      Current Eps
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "10px 10px 10px 365px",
                        fontSize: "14px",
                        color: "lightgray",
                      }}
                    >
                      {animeDetail?.currentEpisode}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "17px 188.3px 10px 5px",
                        fontSize: "16px",
                      }}
                    >
                      Tags
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid gray",
                        padding: "10px 10px 10px 365px",
                        fontSize: "14px",
                        color: "lightgray",
                      }}
                    >
                      {animeDetail?.tags.slice(0, 3).join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="episodes-wrapper">
              <br />
              <br />
              <h2>Episodes</h2>
              <br />
              {/* <div className="card mb-3 bg-dark text-white" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={animeDetail?.coverImage} className="img-fluid rounded h-80" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text"><small className="text-white">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="ep-thumbnail">
                <img
                  src={animeDetail?.bannerImage}
                  alt={animeDetail?.title.romaji}
                  width={338}
                  // width={"338px"}
                  // height={"170px"}
                  style={{ backgroundSize: "cover", filter: "brightness(70%)" }}
                />
              </div>
              <div className="btn-groups mt-4">
                <Link to={`http://localhost/watch/${animeDetail?.id}`}>
                  <button
                    id="btn-banner"
                    className="btn btn-lg text-black"
                    type="button"
                    style={{
                      border: "2px solid #caa800",
                      borderRadius: "0px",
                      backgroundColor: "#caa800",
                      width: "338px",
                      padding: "10px 10px",
                      fontSize: "17px",
                      fontWeight: "500",
                    }}
                  >
                    <i
                      className="fa-solid fa-play"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Start Watching EP 1
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <RecommendSlide />
    </>
  );
};
