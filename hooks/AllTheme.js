import { useEffect, useState } from "react";

const AllTheme = () => {
  const [themes, setThemes] = useState([]);
  useEffect(() => {
    fetch("https://themefisher.com/products.json")
      .then((res) => res.json())
      .then((data) => setThemes(data));
  }, []);
  return {
    themes,
  };
};

export default AllTheme;
