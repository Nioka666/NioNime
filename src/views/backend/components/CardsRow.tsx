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
  const { data: animeStats, error: errorAnimeStats } = useSWR(
    "fetchAnimeStats",
    () => fetchAnifyStats()
  );
  let savedAnimeStats: any = null;
  const storedAnimeStats = localStorage.getItem("animeStats");

  useEffect(() => {
    if (animeStats) {
      const parseJsn = JSON.stringify(animeStats);
      localStorage.setItem("animeStats", parseJsn);
    }
  }, [animeStats]);

  if (storedAnimeStats) {
    try {
      savedAnimeStats = JSON.parse(storedAnimeStats);
    } catch (error) {
      console.error("Error parsing stored animeStats:", error);
    }
  }

  const labels = Object.keys(
    errorAnimeStats ? savedAnimeStats || {} : animeStats || {}
  ).slice(0, 3);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: labels.map((label) => animeStats[label]),
        backgroundColor: ["transparent", "transparent", "transparent"],
        borderColor: ["white", "#ba8b00dd", "gray"],
        borderWidth: 2,
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
        style={{ padding: "100px 0px", margin: "0 -20px", width: "35%" }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div
            className="card-header text-center text-lights"
            style={{ padding: "50px 0px 0px 0px" }}
          >
            <h3 className="text-lighs">
              {/* {animeStats?.anime.toLocaleString("ID-id")} */}
              Content data stats
            </h3>
          </div>
          <div className="card-body" style={{ padding: "20px 25px 15px 25px" }}>
            <div className="d-flex justify-content-between align-items-center p-3">
              <Doughnut
                data={data}
                options={options}
                style={{ cursor: "pointer" }}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
      <div
        className="col-md-5"
        style={{ padding: "100px 0px", margin: "0 -20px", width: "47.7%" }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div
            className="card-header text-start text-lights border-0"
            style={{ padding: "50px 0px 0px 43px" }}
          >
            <h3 className="text-white">Content data stats</h3>
          </div>
          <div
            className="card-body text-start"
            style={{ padding: "0 25px 25px 25px" }}
          >
            <div className="d-flex justify-content-between p-3 text-lights">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Praesentium in asperiores ipsum recusandae officiis, dolores
                corrupti ullam exercitationem eveniet libero aut debitis ea. Eum
                consequatur voluptate numquam dolor ea maxime.
              </p>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};
