import { Axios } from "@lib/axios";
import { useEffect, useReducer } from "react";
import { adminReducer } from "state/adminState/adminReducer";

const adminStates = () => {
  const initialState = {
    loading: true,
    admins: [],
    error: false,
  };

  const [adminState, adminDispatch] = useReducer(adminReducer, initialState);
  useEffect(() => {
    adminDispatch({
      type: "FETCHING_START",
    });
    Axios.get("admin")
      .then((data) =>
        adminDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result,
        })
      )
      .catch(() => adminDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    adminState: adminState,
    adminDispatch: adminDispatch,
  };
};

export default adminStates;
