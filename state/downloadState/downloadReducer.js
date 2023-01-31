export const downloadReducer = (state, action) => {

  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        downloads: action.payload.result,
        allThemes: action.payload.allThemes,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_USER":
      return {
        ...state,
        downloads: [...state.downloads, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        downloads: state.downloads.map((download) => {
          return {
            ...download,
            name:
              download._id === action.payload.id
                ? action.payload.role
                : download.role,
          };
        }),
      };
    case "DELETE_USER":
      return {
        ...state,
        downloads: state.downloads.filter(
          (download) => download._id !== action.id
        ),
      };

    default:
      return state;
  }
};
