import { fetchAnifyStats } from "@utils/anime";
import useSWR from "swr";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CardsRow = () => {
  const { data: animeStats } = useSWR("fetchAnimeStats", () =>
    fetchAnifyStats()
  );

  console.log(animeStats);

  return (
    <>
      <div
        className="col-md-5"
        style={{ padding: "100px 0px", margin: "0 -20px", width: "30%" }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
            <h4 className="text-lighs">Anime Data</h4>
          </div>
          <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h6
                className="card-title text-gray"
                style={{ paddingLeft: "20px" }}
              >
                Special title treatmentless our commits
              </h6>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div
        className="col-md-5"
        style={{ padding: "100px 0px", margin: "0 -20px", width: "30%" }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
            <h4 className="text-lighs">Transactions data</h4>
          </div>
          <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h6
                className="card-title text-gray"
                style={{ paddingLeft: "20px" }}
              >
                Special title treatmentless our commits
              </h6>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
