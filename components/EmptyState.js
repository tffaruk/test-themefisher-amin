import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import Loading from "./Loading";

const EmptyState = ({ empty, colSpan }) => {
  return empty ? (
    <TableBody>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
          colSpan={colSpan}
        >
          <Typography variant="h2">There is no Data</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  ) : (
    <Loading colSpan={colSpan} />
  );
};

export default EmptyState;
