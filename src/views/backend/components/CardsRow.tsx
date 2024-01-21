/* eslint-disable @typescript-eslint/no-explicit-any */
export const CardsRow = () => {
  return (
    <>
      <div
        className="col-md-9"
        style={{ padding: "100px 0px", margin: "0 -20px", width: "80%" }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
            <h4 className="text-lighs">Transactions data</h4>
          </div>
          <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h6
                className="card-title text-gray"
                style={{ paddingLeft: "20px" }}
              >
                Special title treatmentless our commits
              </h6>
              <a
                href="#"
                className="btn fw-medium"
                style={{
                  margin: "-20px 10px 0 0",
                  backgroundColor: "#d1b200",
                  borderRadius: "16px",
                }}
              >
                <i className="fa-solid fa-plus me-2"></i>Add new
              </a>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
