import { useNavigate, useParams } from "react-router-dom";

export const MembershipEdit = () => {
  const navigate = useNavigate();
  const { membershipSlug } = useParams();
  console.log(membershipSlug);

  const handleBack = () => {
    navigate("/admin/users");
  };

  return (
    <>
      <div
        className="col-md-9 trx-edit h-auto"
        style={{
          padding: "90px 0px 50px 0",
          margin: "0 0px",
          width: "102%",
          marginRight: "-200px",
        }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header text-lights">
            <h3 className="text-lighs">User Details</h3>
            <h6 className="text-gray mt-2">
              All of customers detail informations showed here
            </h6>
            <hr className="mt-4" />
          </div>
          <div className="card-body d-flex" style={{ gap: "55px" }}>
            <section className="user-detail-avatar">
              <i
                className="fa-regular fa-address-book text-darkness-gray fw-light"
                style={{ fontSize: "310px" }}
              ></i>
            </section>
            <section className="user-detail-form">
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="trxId">Membership ID : dsg4u7we88eusehus</label>
                      </td>
                      <td>{/* <span>{userDetail?._id}</span> */}</td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="username">Membership level : Ordinary Fans</label>
                      </td>
                      <td>{/* <span>{userDetail?.username}</span> */}</td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="amount">Price :</label>
                      </td>
                      <td>
                        <span> IDR 100.000</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <div className="closingg" style={{ textAlign: "right", marginTop: "120px" }}>
                <p className="text-gray fs-6 mb-4">
                  * Changing or Edit user detail is still <br />
                  Under Development now, please be patient
                </p>
                <button
                  type="button"
                  className="btn btn-danger fw-semibold w-25 fw-semibold btn-cancel"
                  onClick={() => {
                    handleBack();
                  }}
                >
                  back
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
