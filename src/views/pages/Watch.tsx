/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchAnimeDetail } from "@utils/anime";
import { Loading } from "@views/components/Loading";
import { RecommendSlide } from "@views/components/RecommendSlide";
import { VideoPlayer } from "@views/components/VideoPlayer";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export const Watch = () => {
  const animeId = useParams();

  const {
    data: animeWatchDetail,
    error: animeWatchDetailError,
    isValidating: isLoadingAnimeWatchDetail,
  } = useSWR("animeWatchDetail", () => fetchAnimeDetail(animeId.animeId));

  if (animeWatchDetailError) {
    console.log(animeWatchDetailError)
  }

  // animeWatchDetail?.episodes.data[0].episodes.map((ep: any) => {
  //   console.log(ep.title);
  // });

  const providerIndex = animeWatchDetail?.episodes.data;

  // manually loops
  // for (let i = 0; providerIndex && i < providerIndex.length; i++) {
  //   if (providerIndex[i].providerId === 'gogoanime') {
  //     console.info(`index ke ${i} OK`);
  //   }
  // }
  // array method
  const gogoanimeIndex = providerIndex?.findIndex(
    (episode: any) => episode.providerId === 'gogoanime'
  );
  console.info(`index ke ${gogoanimeIndex} OK`);
 

  return (
    <>
      <div className="container" style={{ marginTop: "55px" }}>
        <br />
        <VideoPlayer />
      </div>
      <div
        className="container content-wrappers"
        style={{ display: "flex", margin: "38px 70px", gap: "65px" }}
      >
        <section style={{ width: "690px" }}>
          <div className="d-flex" style={{ gap: "450px" }}>
            <h4 className="text-light">Ponyo on the cliff by the sea</h4>
            <i className="fa-regular fa-bookmark fs-4 m-top-10"></i>
          </div>
          <h5 className="text-gray">EP 1 - Movie Ponyo</h5>
          <h6 className="text-gray m-top-20" style={{ lineHeight: "23px" }}>
            Twilight is an agent that works htmlFor WISE, Westalis's
            intelligence agency, and he is tasked with investigating Desmond,
            who is in Ostania and planning to start a war. Twilight disguises
            himself as the psychiatrist Loid htmlForger and adopts a girl named
            Anya so that he can enroll her into the prestigious Eden College.
            Unbeknownst to him, Anya is actually a telepathad people's minds.
            One day, members of a mafia needs to reconsider his priorities
            and...
          </h6>
          <br />
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
                  MAPPA
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
            </tbody>
          </table>
          <br />
          <br />
          <h4>Downloads</h4>
        </section>

        {/* right section */}
        <section style={{ width: "390px" }}>
          <h4>Next Episode</h4>
          <h6 className="text-gray">List of Episodes...</h6>
          {/* {!isLoadingAnimeWatchDetail && <Loading />}
          {isLoadingAnimeWatchDetail && ( */}
          <div className="d-flex gap-3 m-top-25" style={{ flexWrap: "wrap" }}>
            {animeWatchDetail?.episodes.data[gogoanimeIndex].episodes?.map((episode: any) => (
              <div
                className="ep-square rounded-2"
                style={{
                  cursor: "pointer",
                  width: "70px",
                }}
              >
                <h6 style={{ margin: "0px" }} key={episode.title}>{episode.title}</h6>
              </div>
            ))}
          </div>
          {/* )} */}
        </section>
      </div>
      <RecommendSlide />
    </>
  );
};
