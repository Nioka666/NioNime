import { ButtonOne } from "./Button";

export const PremiumHero = () => {
  return (
    <>
      <div className="container m-top-30">
        <div
          className="py-5 my-5 text-center"
          style={{
            width: "800px",
            border: "3px solid #4c4c4c",
            borderStyle: "dashed",
            margin: "0 auto",
          }}
        >
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Still looking for something to watch? <br /> Check out our full
              library
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <ButtonOne>Browse More</ButtonOne>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
