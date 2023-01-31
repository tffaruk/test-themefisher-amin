export const adminReducer = (state, action) => {
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
        admins: action.payload,
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
        admins: [...state.admins, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        admins: state.admins.map((admin) => {
          return {
            ...admin,
            name:
              admin._id === action.payload.id
                ? action.payload.role
                : admin.role,
          };
        }),
      };
    case "DELETE_USER":
      return {
        ...state,
        admins: state.admins.filter((admin) => admin._id !== action.id),
      };

    default:
      return state;
  }
};
