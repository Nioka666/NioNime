/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddButtonSM = ({ jumpTo }: any) => {
  return (
    <>
      <a
        href={jumpTo}
        className="btn fw-semibold"
        style={{
          margin: "-50px 10px 0 0",
          backgroundColor: "#292a2b",
          borderRadius: "15px",
          padding: "12px 18px"
        }}
      >
        <i className="fa-solid fa-plus text-gray fs-4"></i>
      </a>
    </>
  );
};
