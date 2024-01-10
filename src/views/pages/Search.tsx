/* eslint-disable @typescript-eslint/no-explicit-any */
// Import dependencies and components
import React, { useState } from "react";
import { fetchSearchAnime } from "@utils/anime";
import { Loading } from "@views/components/Loading";
import { Link } from "react-router-dom";

interface Anime {
  id: string;
  title: {
    romaji: string | null;
    native: string | null;
    english: string | null;
  };
  coverImage: string;
}

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [hoveredAnimeId, setHoveredAnimeId] = React.useState<string | null>(
    null
  );

  const handleMouseOver = (animeId: string) => {
    setHoveredAnimeId(animeId);
  };

  const handleSearchInputChange = (e: { target: { value: React.SetStateAction<string> }; }) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchButtonClick = async () => {
    try {
      setIsLoadingSearch(true);
      const encodedQuery = encodeURIComponent(searchQuery);
      const results = await fetchSearchAnime(encodedQuery, 1, 10);

      console.log(results);

      setSearchResults(results.results);
    } catch (error) {
      console.error("Error searching anime:", error);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleSearchFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearchButtonClick();
  };

  // Render the Search component
  return (
    <>
      <div className="container search-page-wrapper">
        <form onSubmit={handleSearchFormSubmit}>
          <div className="search-attribute">
            <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              name="searchQuery"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button className="search-btn" type="submit">
              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>
          </div>
        </form>
      </div>
      {/* Render search results here */}
      <div className="slide-nime mt-5" style={{ marginBottom: "500px" }}>
        <center>
          <div>
            <h3 style={{ marginTop: "-95px" }}>Search Result</h3>
            <h6 className="text-lightgray mb-4">anime search result</h6>
          </div>

          <div className="sss display-wraps" style={{ paddingLeft: "60px" }}>
            <div className="search-results">
              {isLoadingSearch && <Loading />}
              {!isLoadingSearch &&
                searchResults?.map((result: any) => (
                  <Link to={`http://localhost/anime-detail/${result.id}`} key={result.id}>
                    <div
                      key={result.id}
                      className={`small-item ${hoveredAnimeId === result.id ? "hovered" : ""
                        }`}
                      style={{ width: "180px" }}
                      data-result-id={result.id}
                      onMouseOver={() => handleMouseOver(result.id)}
                    >
                      <img
                        src={result.coverImage}
                        className="card-img-top"
                        alt={result.title.romaji}
                        style={{ height: "270px" }}
                      />

                      {/* Overlay */}
                      <div className="overlay">
                        {isLoadingSearch && <Loading />}
                        {!isLoadingSearch && hoveredAnimeId === result.id && (
                          <div className="result-detail">
                            <h6 className="text-normal">
                              {result?.title.romaji}
                            </h6>
                            <strong>
                              <p className="text-gray fw-bold">
                                Rating: {result?.rating.anilist}
                              </p>
                              <p className="text-gray fw-bold">
                                {result?.status}
                              </p>
                              <br />
                            </strong>
                            <p>{result?.description}</p>
                          </div>
                        )}
                      </div>

                      <div className="result-title m-top-10">
                        <h6 style={{ fontSize: "15px" }}>{result.title.romaji}</h6>
                        <h6 className="text-gray" style={{ marginTop: "-15px", fontSize: "14px" }}>EP. {result.currentEpisode}</h6>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </center>
      </div>
    </>
  );
};
