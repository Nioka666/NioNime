import { fetchUserData, serverURL } from "@utils/anime";
import { Loading } from "@views/components/Loading";
import axios from "axios";
import useSWR from "swr";

export const MembershipInfo = () => {
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: true,
  });

  const userIDs = userData?.id;

  const { data: userDetail, isValidating: loadingMembership } = useSWR(
    "fetchUserDetail",
    () =>
      axios
        .post(
          `${serverURL}/api/user-details`,
          { userIDs },
          { withCredentials: true }
        )
        .then((response) => response.data),
    { revalidateOnFocus: false }
  );

  const isNobleFans = (() => {
    if (userDetail?.membership_level === "Noble Fans") {
      return true;
    } else {
      return false;
    }
  })();

  const userMembership = userDetail?.membership_level;

  return (
    <>
      <form className="d-grid changePassword">
        <h3>Membership Information</h3>
        <h6 className="text-gray mt-1">Your Membership Information</h6>
        <div className="input-groups d-grid gap-4 mt-5">
          {loadingMembership && <Loading />}
          {!loadingMembership && isNobleFans && (
            <>
              <h1 className="text-warning fw-bold">{userMembership}</h1>
              <h5 className="text-gray">Your Subscription is active untill </h5>
              <h5 className="text-gray">DATE HERE </h5>
            </>
          )}
          {!loadingMembership && !isNobleFans && (
            <>
              <h1 className="text-white fw-bold">{userMembership}</h1>
              <h5 className="text-gray"></h5>
            </>
          )}
          <label className="" htmlFor="">
            <i className="fa-solid fa-exclamation"></i> Your membership is being
            on for a lifetime..
          </label>
        </div>
      </form>
    </>
  );
};
