/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { } from "module";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeDetail } from "../../utils/anime";
import useSWR from "swr";
import { RecommendSlide } from "@views/components/RecommendSlide";
import { Loading } from "@views/components/Loading";

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
      {isLoadingAnimeDetail && <Loading />}
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
              <h4
                className="anime-detail-title"
                style={{
                  margin: "0px 0 10px 0px",
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

              <div className="description mt-4" style={{ width: "80%" }}>
                <p style={{ fontSize: "15px" }}>
                  {animeDetail?.description.substring(0, 300)}
                </p>
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
                      fontWeight: "600"
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
            <div className="more-detail" style={{ width: "730px" }}>
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
              <br />
              <div className="ep-thumbnail">
                <img
                  src={animeDetail?.bannerImage}
                  alt={animeDetail?.title.romaji}
                  width={"338px"}
                  height={"170px"}
                  style={{ backgroundSize: "cover" }}
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
      <br /><br />
      <RecommendSlide />
    </>
  );
};
