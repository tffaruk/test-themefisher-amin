import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

const Loading = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
          colSpan={9}
        >
          <Typography variant="h2">Loading...</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default Loading;
