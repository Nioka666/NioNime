const PricingHeader = () => {
  return (
    <>
      <header>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center text-white">
          <h1 className="display-4 fw-normal text-white">Membership Plans</h1>
          <p className="fs-5 text-gray mt-4" style={{ padding: "0 100px" }}>
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It’s built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>
      </header>
    </>
  );
};

export const Pricing = () => {
  return (
    <>
      <div className="container">
        <PricingHeader />
        <main>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center mt-4">
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm bg-gray-blue text-white h-90">
                <div className="card-header py-3 bg-dark text-white">
                  <h4 className="my-0 fw-normal">Free</h4>
                </div>
                <div className="card-body p-5">
                  <h1 className="card-title pricing-card-title">
                    $0<small className="text-white fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>10 users included</li>
                    <li>2 GB of storage</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-outline-warning"
                  >
                    Sign up for free
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm bg-gray-blue text-white h-90">
                <div className="card-header bg-dark py-3">
                  <h4 className="my-0 fw-normal">Pro</h4>
                </div>
                <div className="card-body p-5">
                  <h1 className="card-title pricing-card-title">
                    $15<small className="text-white fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>20 users included</li>
                    <li>10 GB of storage</li>
                    <li>Priority email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-warning"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm bg-gray-blue text-white h-90">
                <div className="card-header py-3 text-bg-warning">
                  <h4 className="my-0 fw-normal">Enterprise</h4>
                </div>
                <div className="card-body p-5">
                  <h1 className="card-title pricing-card-title">
                    $29<small className="text-white fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>30 users included</li>
                    <li>15 GB of storage</li>
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-warning"
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <h2 className="display-6 text-center mb-4">Compare plans</h2>
        <div className="table-responsive bg-dark">
          <table className="table text-center bg-dark" style={{ backgroundColor: "black" }}>
            <thead>
              <tr>
                <th style={{ width: "34%" }}></th>
                <th style={{ width: "22%" }}>Free</th>
                <th style={{ width: "22%" }}>Pro</th>
                <th style={{ width: "22%" }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="text-start">
                  Public
                </th>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Private
                </th>
                <td></td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th scope="row" className="text-start">
                  Permissions
                </th>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Sharing
                </th>
                <td></td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Unlimited members
                </th>
                <td></td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-start">
                  Extra security
                </th>
                <td></td>
                <td></td>
                <td>
                  <svg className="bi" width="24" height="24">
                    <use href="#check"></use>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        </main>
      </div>
    </>
  );
};
