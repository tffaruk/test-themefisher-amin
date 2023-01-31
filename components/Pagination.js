import { Grid, Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";

const PaginationComponent = ({ handlePagination, dataLength }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} lg={12} mt="30px" mb="30px">
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={Math.ceil(dataLength)}
          variant="outlined"
          onChange={handlePagination}
          page={Number(router.query?.page ? router.query?.page : 1)}
        />
      </Stack>
    </Grid>
  );
};

export default PaginationComponent;
