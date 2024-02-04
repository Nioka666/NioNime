/* eslint-disable @typescript-eslint/no-explicit-any */
// EpisodesPagination.js
import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";

interface EpisodesPaginationProps {
  episodes: any[];
  onEpisodeClick: (index: number) => void;
  currentEpisodeIndex: any;
}

const EpisodesPagination: React.FC<EpisodesPaginationProps> = ({
  episodes,
  onEpisodeClick,
  currentEpisodeIndex,
}) => {
  const episodesPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );

  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentPage]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxIndicators = 3;

    let startPage = Math.max(currentPage - Math.floor(maxIndicators / 2), 1);
    let endPage = Math.min(startPage + maxIndicators - 1, totalPages);

    startPage = Math.max(1, startPage);
    endPage = Math.min(totalPages, endPage);

    for (let i = startPage; i <= endPage; i++) {
      const isCurrent = currentPage === i;
      const isActive =
        currentEpisodeIndex >= indexOfFirstEpisode &&
        currentEpisodeIndex < indexOfLastEpisode;

      pageNumbers.push(
        <button
          key={i}
          className={`btn ep-square-controls rounded-3 text-white ${
            isCurrent ? "current" : ""
          } ${isActive ? "active" : ""}`}
          onClick={() => onEpisodeClick(indexOfFirstEpisode + i - 1)}
          style={{
            backgroundColor: isCurrent ? "#cf9700" : "",
            border: "none",
          }}
        >
          <h6 style={{ margin: "0px 10px" }}> {i}</h6>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <h4 className="mt-0">Next Episodes</h4>
      <h6 className="text-gray">List of Episodes...</h6>
      <div className="d-flex gap-3 m-top-25" style={{ flexWrap: "wrap" }}>
        {loading && <Loading />}
        {!loading &&
          currentEpisodes.map((episode, index) => (
            <button
              className={`btn ep-square rounded-3 text-white ${
                index === currentEpisodeIndex ? "current" : ""
              }`}
              style={{
                cursor: "pointer",
                width: "65px",
                backgroundColor: index === currentEpisodeIndex ? "#cf9700" : "",
              }}
              key={episode.id}
              onClick={() => onEpisodeClick(indexOfFirstEpisode + index)}
            >
              <h6 style={{ margin: "0px" }}>E {episode.number}</h6>
            </button>
          ))}
      </div>
      <div className="pagination mt-3 d-flex gap-2 mt-5">
        <button
          className="ep-square-controls rounded-3 text-white"
          onClick={handlePreviousClick}
          disabled={currentPage === 1 || loading}
          style={{ border: "none", cursor: "pointer" }}
        >
          Previous
        </button>
        {renderPagination()}
        <button
          className="ep-square-controls rounded-3 text-white"
          onClick={handleNextClick}
          disabled={currentPage === totalPages || loading}
          style={{ border: "none", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EpisodesPagination;
