import updateUser from "@hooks/useUpdate";
import { modalStyle } from "@lib/customStyles";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const WarningModal = ({
  open,
  setOpen,
  setIsToast,
  setToastMessage,
  setUpdateButton,
  setIsSubmit,
  data,
  handleDiscard,
}) => {
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleClose = () => {
    handleDiscard();
  };
  const { updater } = updateUser(
    setIsToast,
    setToastMessage,
    setUpdateButton,
    setIsSubmit
  );
  const handleUpdate = () => {
    updater(data, setLoader, setSubmitted);
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle(400)}>
        <Typography
          textAlign="center"
          paragraph={true}
          sx={{ fontSize: "18px" }}
        >
          You have an update document{" "}
          {/* <span style={{ fontWeight: 600 }}>{params}</span>? */}
        </Typography>
        <Grid textAlign="center">
          <Button onClick={handleUpdate} variant="outlined" color="danger">
            Save
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ marginLeft: "10px" }}
            color="success"
          >
            Discard
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default WarningModal;
