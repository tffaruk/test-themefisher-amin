import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";

const Header = ({
  sx,
  customClass,
  toggleMobileSidebar,
  position,
  signOut,
}) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Button onClick={() => signOut()} variant="contained" color={"primary"}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
