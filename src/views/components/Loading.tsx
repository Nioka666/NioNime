export const Loading = () => {
  return (
    <>
      <div
        className="loading-container d-flex justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div
          className="spinner-grow text-secondary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export const SearchLoading = () => {
  return (
    <>
      <div
        className="loading-container d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div
          className="spinner-grow text-secondary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export const StreamLoading = () => {
  return (<>
    <div
      className="loading-container d-flex justify-content-center"
      style={{ marginTop: "186px" }}
    >
      <div
        className="spinner-grow text-secondary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </>)
}

export const LoadingButton = () => {
  return (
    <>
      <span
        className="spinner-grow spinner-grow-sm"
        aria-hidden="true"
      ></span>
    </>
  );
};
