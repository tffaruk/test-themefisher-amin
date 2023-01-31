import { Link } from "@mui/material";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.svg"
        alt="gethugothemes admin"
        width="300"
        height="95"
        priority
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
