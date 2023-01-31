import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteModal from "components/DeleteModal";
import EmptyState from "components/EmptyState";
import Toast from "components/Toast";

import FeatherIcon from "feather-icons-react";
import { Suspense, useState } from "react";

const ReviewTrash = ({
  handleTrash,
  trash,
  trashData,
  handleDelete,
  isToast,
  toastMessage,
  setOpen,
  open,
  empty,
}) => {
  const [userId, setUserId] = useState("");
  const trashHandler = (id, trash) => {
    handleTrash(trash, id);
  };
  const openHandler = (id) => {
    setUserId(id);
    setOpen(true);
  };
  return (
    <Suspense>
      <DeleteModal
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        userId={userId}
        params="review"
      />
      <Toast isToast={isToast} message={toastMessage} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Restore</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {trashData.length ? (
            <TableBody>
              {trashData.map((data, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{
                    opacity: trash.map((data) => data.id).includes(data._id)
                      ? 0.3
                      : 1,
                  }}
                >
                  <TableCell>{data.name}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      onClick={() => trashHandler(data._id, !data.trash)}
                    >
                      <FeatherIcon icon="rotate-ccw" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      variant="contained"
                      onClick={() => openHandler(data._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <EmptyState empty={empty} colSpan="3" />
          )}
        </Table>
      </TableContainer>
    </Suspense>
  );
};

export default ReviewTrash;
