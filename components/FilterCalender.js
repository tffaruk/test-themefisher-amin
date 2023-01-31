import { Button, Grid } from "@mui/material";
import { DateRangePicker } from "mui-daterange-picker";
import { useState } from "react";
import { useAppContext } from "store/store";

const FilterCalender = ({ dateRange, setDateRange }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Grid mb={4}>
      <Button onClick={toggle}>
        {dateRange.startDate.toLocaleDateString()} To{" "}
        {dateRange.endDate.toLocaleDateString()}
      </Button>
      <DateRangePicker
        open={open}
        initialDateRange={dateRange}
        toggle={toggle}
        onChange={(range) => setDateRange(range)}
      />
    </Grid>
  );
};
export default FilterCalender;
