/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

export const ButtonOne: React.FC<any> = (props) => {
  return (
    <>
      <button
        id="btn-banner"
        className="btn btn-lg text-white nionime-button"
        type="button"
      >
        {props.children}
      </button>
    </>
  );
};
