import {
  Box,
  Container,
  experimentalStyled,
  useMediaQuery,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children, updateButton, setWarning }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { data: session, status } = useSession();
  
  if (status === "unauthenticated") {
    signIn();
  }

  return (
    <>
      <MainWrapper>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb",
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          session={session}
          signOut={signOut}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          updatedButton={updateButton}
          setWarning={setWarning}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: "20px",
              paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
            <Footer />
          </Container>
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
