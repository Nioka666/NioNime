/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export const LoginFailModal = ({ showModal, closeModal }: any) => {
  const [displayStyle, setDisplayStyle] = useState("none");

  useEffect(() => {
    setDisplayStyle(showModal ? "block" : "none");
  }, [showModal]);

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      style={{ display: displayStyle }}
    >
      <div className="modal-dialog modal-danger">
        <div className="modal-content bg-danger">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <i className="fa-solid fa-xmark fa-lg text-black"></i>
            </button>
            {/* <h4 className="modal-title">Modal Header</h4> */}
          </div>
          <div className="modal-body text-black text-center">
            <h1 className="p-4">Login Failed</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
