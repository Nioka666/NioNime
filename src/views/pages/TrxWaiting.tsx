/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { fetchTrxData } from "@utils/anime";
import axios from "axios";

export const TrxWaiting = () => {
  const { data: trxDAT } = useSWR("fetchTrxDAT", () => fetchTrxData());
  // const trxID = trxDAT?._id;

  const fetchDetail = (async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/transactions-detail",
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <>
      <center>
        <div className="container" style={{ marginTop: "200px" }}>
          {trxDAT ? (
            <>
              <h2>Data has been loaded:</h2>
              <pre>{JSON.stringify(trxDAT, null, 2)}</pre>
            </>
          ) : (
            <>
              <i
                className="fa-regular fa-hourglass-half text-gray"
                style={{ fontSize: "140px", transform: "rotate(10deg)" }}
              ></i>
              <h2 className="mt-4 text-gray">Please wait...</h2>
            </>
          )}
        </div>
      </center>
    </>
  );
};
