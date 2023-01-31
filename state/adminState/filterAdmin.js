import { useReducer } from "react";
import adminState from "./adminState";

const filterAdmin = () => {
  const {
    adminState: { admins },
  } = adminState();
  const filterReducer = (state, action) => {
    const filterAdmin = admins.filter((admin) => user._id === action.id);

    switch (action.type) {
      case "SINGLE_USER":
        return {
          ...state,
          admins: filterAdmin,
        };
      default:
        return state;
    }
  };
  const initialState = {
    users: [],
  };
  const [filterAdminState, filterDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterDisPatch, filterAdminState };
};

export default filterAdmin;
