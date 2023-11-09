export const ErrorPage = () => {
  return (
    <>
      <div className="container error-main" style={{ marginTop: "130px" }}>
        <img src="./img/sus.png" height="400px" />
        <div className="error-msg">
          <h1 className="error-h1 text-gray">
            <span>Oops..</span>
            <br />
            404 Error: File Not Found
          </h1>
          <h2>
            <a href="/" className="text-gray">
              Go back
            </a>
          </h2>
        </div>
      </div>
    </>
  );
};
