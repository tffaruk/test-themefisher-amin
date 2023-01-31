import { useState } from "react";
import {
  IconButton,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { Axios } from "@lib/axios";
import Delete from "components/Delete";
import { useAppContext } from "store/store";

const AdminCard = ({ roles, admin, index, admin_email, setRole }) => {
  const { adminDispatch, toastDispatch, userDispatch } = useAppContext();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { _id, email, role } = admin;
  const [userRole, setUserRole] = useState(role);
  const [open, setOpen] = useState(false);
  const openRole = (e, id, value) => {
    if (e.detail === 2) {
      if (value === userRole) {
        setOpen(!open);
      }
    }

    if (e.keyCode === 13) {
      closeInput(e, id, value);
    }
  };
  const closeInputByrow = (e, id, value) => {
    closeInput(e, id, value);
  };
  const closeInput = async (e, id, value) => {
    if (e.target.value === userRole) {
      setOpen(false);
      setUserRole(e.target.value);
      const res = await Axios.patch(`admin/update/${id}`, {
        role: userRole,
      });
      if (res.status === 200) {
        setRole(userRole);
        adminDispatch({
          type: "UPDATE_USER",
          payload: {
            id: id,
            role: userRole,
          },
        });
        toastDispatch({
          type: "TOAST",
          message: "Update Usear Successfully",
        });
      }
    }
  };

  // delete user
  const deleteUser = async () => {
    const res = await Axios.get(`admin/delete/${_id}`);
    if (res.status === 200) {
      userDispatch({
        type: "DELETE_USER",
        id: _id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Usear Successfully",
      });
      setIsDeleteModal(false);
    }
  };

  return (
    <TableBody>
      <Delete
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        item={email}
        handleDelete={deleteUser}
      />
      <TableRow
        key={index}
        sx={{
          backgroundColor: admin_email === email ? "#eee" : "#fff",
        }}
      >
        <TableCell>{index + 1}</TableCell>

        <TableCell component="td" scope="row">
          {email}
        </TableCell>

        {open ? (
          <Select
            displayEmpty
            onKeyDown={(e) => openRole(e, _id, role)}
            onBlur={(e) => closeInputByrow(e, _id, role)}
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
          >
            <MenuItem disabled> {userRole}</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="modaretor">Moderator</MenuItem>
          </Select>
        ) : (
          <TableCell
            onClick={(e) => roles === "admin" && openRole(e, _id, userRole)}
          >
            {userRole}
          </TableCell>
        )}
        {roles === "admin" && (
          <TableCell>
            <IconButton onClick={() => setIsDeleteModal(true)}>
              <FeatherIcon icon="trash-2" style={{ color: "red" }} />
            </IconButton>
          </TableCell>
        )}

        <TableCell></TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AdminCard;
