import { Axios } from "@lib/axios";
import { useEffect, useReducer, useState } from "react";
import { downloadReducer } from "./downloadReducer";

const downloadStates = () => {
  const initialState = {
    loading: true,
    downloads: [],
    allThemes: [],
    error: false,
  };
  const [theme, setTheme] = useState("");
  let query = `${theme && `theme=${theme}&`}dashboard=true`;
  const [downloadState, downloadDispatch] = useReducer(
    downloadReducer,
    initialState
  );
  useEffect(() => {
    downloadDispatch({
      type: "FETCHING_START",
    });
    Axios.get(`download/data?${query}`)
      .then((data) =>
        downloadDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data,
        })
      )
      .catch(() => downloadDispatch({ type: "FETCHING_FAILED" }));
  }, [theme]);

  return {
    downloadState: downloadState,
    downloadDispatch: downloadDispatch,
    setTheme: setTheme,
  };
};

export default downloadStates;
