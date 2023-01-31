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

import FeatherIcon from "feather-icons-react";
import { Suspense, useState } from "react";
import DeleteModal from "components/DeleteModal";
import Toast from "components/Toast";
import EmptyState from "components/EmptyState";

const ShowcaseTrash = ({
  handleTrash,
  trash,
  trashData,
  isToast,
  handleDelete,
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
      <Toast isToast={isToast} message={toastMessage} />

      <DeleteModal
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        userId={userId}
        params="Website"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Theme</TableCell>
              <TableCell>Restore</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {trashData.length ? (
            <TableBody>
              {trashData.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{
                    opacity: trash.map((data) => data.id).includes(row._id)
                      ? 0.3
                      : 1,
                  }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.website}</TableCell>
                  <TableCell>{row.theme}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      onClick={() => trashHandler(row._id, !row.trash)}
                    >
                      <FeatherIcon icon="rotate-ccw" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      variant="contained"
                      onClick={() => openHandler(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <EmptyState empty={empty} colSpan="5" />
          )}
        </Table>
      </TableContainer>
    </Suspense>
  );
};

export default ShowcaseTrash;
