export const modalStyle = (width) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  return style;
};

export const selectStyle = () => {
  const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected && "#5b25b2",
    }),
    menu: (base) => ({
      ...base,
      position: "relative",
      zIndex: 2,
    }),
    input: (base, state) => ({
      ...base,
    }),
    control: (provided, state) => ({
      ...provided,
      height: 56,
      borderRadius: 5,
      borderColor: state.isFocused
        ? "#5b25b2"
        : state.isHover
        ? "#5b25b2"
        : "#dedede",
      boxShadow: null,
      "&:hover": {
        borderColor: state.isFocused ? "#5b25b2" : "#dedede",
      },

      marginTop: "16px",
      marginBottom: "8px",
    }),
  };
  return selectStyle;
};
