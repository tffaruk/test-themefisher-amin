import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ColorComponent = () => {
  const status = [
    {
      status: "Today",
      color: "#3f58dd5e",
    },
    {
      status: "Yesterday",
      color: "#4ac74f4a",
    },
    {
      status: "Day before yesterday",
      color: "#e2d13d4f",
    },
  ];

  return (
    <Grid
      sx={{
        display: "flex",
        marginLeft: "-20px",
        marginBottom: "30px",
      }}
    >
      {status.map((data, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              height: "18px",
              width: "18px",
              backgroundColor: data.color,
            }}
          ></Box>
          <Typography ml="5px">{data.status}</Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default ColorComponent;
