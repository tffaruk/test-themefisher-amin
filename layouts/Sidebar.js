import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  useMediaQuery,
} from "@mui/material";
import Logo from "components/Logo";
import FeatherIcon from "feather-icons-react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import Menuitems from "./MenuItems";

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  updatedButton,
  setWarning,
}) => {
  const [openIndex, setOpenIndex] = useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const handleClick = (index, value) => {
    if (openIndex === index) {
      setOpenIndex((prevopen) => !prevopen);
    } else {
      setOpenIndex(index);
    }
  };
  let curl = useRouter();
  const location = curl.pathname;

  const handleRoute = (url) => {
    if (updatedButton) {
      setWarning(true), curl.push("");
    } else {
      curl.push(url);
    }
  };

  const SidebarContent = (
    <Box p={2} height="100%">
      <Logo />
      <Box mt={2}>
        <List>
          {Menuitems.map((item, index) => (
            <List component="li" disablePadding key={item.title}>
              <Button
                // href={updatedButton ? item.href : ""}
                onClick={() => handleRoute(item.href)}
                sx={{
                  display: "block",
                  width: "100%",
                }}
              >
                <ListItem
                  onClick={() => handleClick(index, item.value)}
                  button
                  selected={location === item.href}
                  sx={{
                    mb: 1,
                    ...(location === item.href && {
                      color: "white",
                      width: "100%",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  <ListItemIcon>
                    <FeatherIcon
                      style={{
                        color: `${location === item.href ? "white" : ""} `,
                      }}
                      icon={item.icon}
                      width="20"
                      height="20"
                    />
                  </ListItemIcon>

                  <ListItemText onClick={onSidebarClose}>
                    {item.title}
                  </ListItemText>
                </ListItem>
              </Button>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
