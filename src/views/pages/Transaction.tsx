export const Transaction = () => {
  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="container d-grid gap-4" style={{ marginTop: "100px", width: "80%" }}>
          <center>
            <h2>Transaction Form</h2>
            <br /><br />
          </center>
          <section>
            <div className="selected-option d-grid" style={{ backgroundColor: "#323232", width: "100%", height: "75px", borderRadius: "10px" }}>
              <h4 className="text-lights fw-medium" style={{ margin: "auto 30px" }}>Selected Plans</h4>
            </div>
          </section>
          
          <section>
            <div className="selected-option d-grid" style={{ backgroundColor: "#323232", width: "100%", height: "805px", borderRadius: "10px" }}>
              <h4 className="text-lights fw-medium" style={{ margin: "auto 30px" }}>Selected Plans</h4>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
