export const Footer = () => {
  return (
    <>
      <footer className="container py-5" style={{ padding: "0 60px" }}>
        <div className="row">
          {/* <div className="col-12 col-md">
            <img src="./img/logo.png" height="20px" />
          </div> */}
          <div className="col-6 col-md">
            <h5>Navigation</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  New Updates
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Browse
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>NioNime</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Help/FAQ
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  License
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Account</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  My Profiles
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  History
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Membership Status
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Log out
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Connect with us</h5>
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
        <hr />
        <h6 className="text-lights">&copy; 2023 Nioka666.</h6>
      </footer>
    </>
  );
};
