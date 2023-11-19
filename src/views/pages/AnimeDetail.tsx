/* eslint-disable @typescript-eslint/no-unused-vars */
import {} from "module";
import { useParams } from "react-router-dom";
import { fetchAnimeDetail } from "../../utils/anime";
import useSWR from "swr";

const AnimeDetailCarousel = () => {
  return (
    <>
      <div
        className="p-5 text-center bg-black"
        style={{
          marginTop: "88px",
          backgroundImage: "url(../../../img/dark_war.jpg)",
          backgroundSize: "cover",
          // backgroundPosition: "0px",
          height: "260px",
          cursor: "pointer",
        }}
      ></div>
    </>
  );
};

export const AnimeDetail = () => {
  const { animeId } = useParams();
  const { data: animeDetail, error: animeDetailError } = useSWR(
    "animeDetail",
    () => fetchAnimeDetail(animeId)
  );

  if (animeDetailError) {
    console.log(animeDetailError);
  }

  return (
    <>
      <AnimeDetailCarousel />
      <div
        className="container profile-page"
        style={{ margin: "-55px 0 0 72px" }}
      >
        <div className="row d-flex">
          <div className="col-lg-4 d-flex w-100 user-wrapper">
            <img
              src={animeDetail?.image}
              height={"290px"}
              width={"200px"}
              className="bd-placeholder-img rounded-4"
              style={{
                border: "0px solid black",
                cursor: "pointer",
                marginTop: "-80px",
              }}
            />
            <h4
              className="profile-username"
              style={{
                margin: "85px 0 0 38px",
                fontWeight: "500",
                fontSize: "29px",
              }}
            >
              {animeDetail?.title} <br />
              <span style={{ fontSize: "17px", color: "gray" }}>
                {animeDetail?.genres[1]}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
