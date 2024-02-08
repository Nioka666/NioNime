/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchAnifyStats } from "@utils/anime";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CardsRow = () => {
  const {
    data: animeStats,
    error: errorAnimeStats,
    isValidating: loadingAnimeStats,
  } = useSWR("fetchAnimeStats", () => fetchAnifyStats(), {
    loadingTimeout: 5000,
  });

  useEffect(() => {
    if (animeStats) {
      const parseJsn = JSON.stringify(animeStats);
      localStorage.setItem("animeStats", parseJsn);
    }
  }, [animeStats]);

  const storedAnimeStats = localStorage.getItem("animeStats");
  let savedAnimeStats: any = null;
  console.log(savedAnimeStats);

  if (storedAnimeStats) {
    try {
      savedAnimeStats = JSON.parse(storedAnimeStats);
    } catch (error) {
      console.error("Error parsing stored animeStats:", error);
    }
  }

  const labels = Object.keys(
    errorAnimeStats ? animeStats || {} : animeStats || {}
  ).slice(0, 3);
  // Local storage

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: labels.map((label) => animeStats[label]),
        backgroundColor: ["transparent", "transparent", "transparent"],
        borderColor: ["white", "#ba8b00dd", "gray"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div
        className="col-md-5"
        style={{
          padding: "90px 0px 0px 0",
          margin: "0 0px",
          width: "45%",
          marginRight: "-200px",
          marginLeft: "-2.5px",
        }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div
            className="card-header text-center text-lights"
            style={{ padding: "50px 0px 0px 0px" }}
          >
            <h3 className="text-lighs">Content data stats</h3>
            <h6 className="text-gray fw-light" style={{ fontSize: "14px" }}>
              the statistic of all contents <br /> available on NioNime
            </h6>
          </div>
          <div className="card-body" style={{ padding: "20px 25px 15px 25px" }}>
            <div className="d-flex justify-content-between align-items-center p-3">
              {!loadingAnimeStats && (
                <Doughnut
                  data={data}
                  options={options}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <br />
          </div>
        </div>
      </div>
      <div
        className="col-md-10"
        style={{
          padding: "90px 0px 50px 0",
          margin: "0 0px",
          width: "60.4%",
          marginLeft: "150px",
          marginRight: "-200px",
        }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div
            className="card-header text-start text-lights border-0"
            style={{ padding: "50px 0px 0px 43px" }}
          >
            <h3 className="text-lights">Details</h3>
            <h6 className="text-gray">
              Lorem ipsum, dolor sit amet consectetur <br /> adipisicing elit.
            </h6>
          </div>
          {!loadingAnimeStats && (
            <div
              className="card-body text-start"
              style={{ padding: "10px 25px 15px 25px", height: "auto" }}
            >
              <div className="d-grid justify-content-between p-3 text-lights">
                <div className="row-detail d-flex">
                  <h1 className="display-2 fw-semibold text-lights">
                    {animeStats?.manga.toLocaleString("ID-id")}
                  </h1>
                  <h3 className="text-lights mt-2 ms-4 me-auto">
                    Manga's <br /> Found
                  </h3>
                </div>
                <div className="row-detail d-flex">
                  <h1 className="display-3 fw-semibold text-warning">
                    {animeStats?.anime.toLocaleString("ID-id")}
                  </h1>
                  <h3 className="text-warning mt-2 ms-4 me-auto">
                    Anime's <br /> Found
                  </h3>
                </div>
                <div className="row-detail d-flex">
                  <h1 className="display-3 fw-semibold text-gray">
                    {animeStats?.novels.toLocaleString("ID-id")}
                  </h1>
                  <h4 className="text-gray mt-2 ms-4 me-auto">
                    Novel's <br /> Found
                  </h4>
                </div>
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
