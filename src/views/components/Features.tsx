export const Features = () => {
  return (
    <>
      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">Features with title</h2>

        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div className="col d-flex flex-column align-items-start gap-2">
            <h2 className="fw-bold text-white">
              Left-aligned title explaining these awesome features
            </h2>
            <p className="text-gray">
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a href="#" className="btn btn-warning btn-lg">
              warning button
            </a>
          </div>

          <div className="col">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-bolt-lightning p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Fast</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                  <i className="fa-solid fa-sack-dollar p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Good Offers</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                <i className="fa-solid fa-ban p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">No Ads</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3 w-25">
                <i className="fa-solid fa-fire p-3 text-black"></i>
                </div>
                <h4 className="fw-semibold mb-0 text-white">Updates</h4>
                <p className="text-gray">
                  Paragraph of text beneath the heading to explain the heading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
