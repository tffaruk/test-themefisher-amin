import { Axios } from "./axios";

export const deletefunction = async (
  userId,
  state,
  setState,
  setIsToast,
  setToastMessage,
  setOpenDelete,
  params
) => {
  await Axios.get(`${params}/delete/${userId}`).then((res) => {
    if (res.status === 200) {
      setOpenDelete(false);
      setIsToast(true);
      setToastMessage("!Delete successfully");

      setTimeout(() => {
        setIsToast(false);
        setToastMessage("");
      }, 2000);
    }
  });
  const filteBydelete = state.filter((data) => data._id !== userId);
  setState(filteBydelete);
};
