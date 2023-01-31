import { Axios } from "@lib/axios";
import { modalStyle } from "@lib/customStyles";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import Label from "components/FormLabel";
import { useState } from "react";
import { useAppContext } from "store/store";

const AdminForm = ({ open, setOpen }) => {
  const [admin, setAdmin] = useState({ email: "", password: "", role: "" });
  const { adminDispatch, toastDispatch } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "admin/",
        {
          email: admin.email,
          password: admin.password,
          role: admin.role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        setAdmin({ ...admin, email: "", password: "", role: "" });
        setOpen(false);
        adminDispatch({
          type: "ADD_USER",
          payload: admin,
        });
        toastDispatch({
          type: "TOAST",
          message: "Delete Usear Successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(400)}>
          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid item xs={6}>
                <Label htmlFor="email" required={true} label="Email" />
                <TextField
                  id="email"
                  placeholder="Email"
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Label htmlFor="password" required={true} label="Password" />
                <TextField
                  id="password"
                  placeholder="password"
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                  type="password"
                />
              </Grid>
              <Grid item xs={6}>
                <Label htmlFor="role" required={true} label="Select role" />
                <Select
                  sx={{
                    marginBottom: "10px",
                  }}
                  onChange={(e) => setAdmin({ ...admin, role: e.target.value })}
                  value={admin.role}
                  displayEmpty
                  fullWidth
                  placeholder="Select Role"
                >
                  <MenuItem value="" disabled>
                    <em>Select a role</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="modaretor">Modaretor</MenuItem>
                </Select>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminForm;
