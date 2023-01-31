import { createContext, useContext } from "react";
import adminStates from "state/adminState/adminState";
import filterAdmin from "state/adminState/filterAdmin";
import downloadStates from "state/downloadState/downloadStates";
import toastReducer from "state/toastReducer";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  // user state
  const { adminState, adminDispatch } = adminStates();
  const { downloadState, downloadDispatch,setTheme } = downloadStates();

  const { filterAdminState, filterDisPatch } = filterAdmin(adminState.admins);
  //  toast
  const { toastDispatch, toastState } = toastReducer();
  // all state
  let state = {
    // users
    adminState,
    adminDispatch,
    // for single user
    filterAdminState,
    filterDisPatch,
    downloadState,
    downloadDispatch,
    setTheme,
    // toast
    toastDispatch,
    toastState,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
