export const Footer = () => {
  return (
    <>
      <footer className="container py-5">
        <div className="row">
          <div className="col-12 col-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="d-block mb-2"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Product</title>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
            </svg>
            <small className="d-block mb-3 text-white">© 2017–2023</small>
          </div>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Cool stuff
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Random feature
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Team feature
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Stuff for developers
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Another one
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Last time
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Resource name
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Resource
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Another resource
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Final resource
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Business
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Education
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Government
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Gaming
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Team
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Locations
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
