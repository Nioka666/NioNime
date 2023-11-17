export const ErrorPage = () => {
  return (
    <>
      <div className="container error-main">
        <img src="../../img/sus.png" height="388px" alt="sus amogus" />
        <div className="error-msg">
          <h1 className="error-h1 text-gray">Oops..</h1>
          <h2 className="text-darkgray">We can't seem to find the page you're looking for</h2>
          <h2 className="text-darkgray fw-bold">Error code : 404</h2>
        </div>
      </div>
    </>
  );
};
