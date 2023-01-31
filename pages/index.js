import FullLayout from "layouts/FullLayout";
import { useSession, signIn, getSession } from "next-auth/react";
import { useAppContext } from "store/store";
import Select from "react-select";
import Chart from "components/Chart";
import FilterCalender from "components/FilterCalender";
import { useState } from "react";

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected && "#5b25b2",
    textTransform: "capitalize",
  }),
};

export default function Index() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  });

  const {
    downloadState: { downloads, allThemes: themes },
    setTheme,
  } = useAppContext();
  const add = (array) => {
    const value = array.reduce((prev, curr) => prev + curr.download, 0);
    return value;
  };
  const downloadFields = downloads.sort(
    (a, b) => add(b.downloads) - add(a.downloads)
  );

  const filterDataByDate = downloadFields.map((el) => {
    var between = el.downloads.filter((item) => {
      return (
        new Date(item.date).getTime() >= dateRange.startDate.getTime() &&
        new Date(item.date).getTime() <= dateRange.endDate.getTime()
      );
    });
    return {
      ...el,
      downloads: between,
    };
  });

  const allThemes = themes?.map((theme) => {
    return {
      value: theme,
      label: theme,
    };
  });

  allThemes.unshift({ value: "", label: "All Theme" });

  // const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    signIn();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FullLayout>
      {" "}
      <FilterCalender dateRange={dateRange} setDateRange={setDateRange} />
      <Select
        defaultValue="All Theme"
        onChange={(e) => setTheme(e.value)}
        options={allThemes}
        isSearchable
        placeholder="Theme"
        styles={selectStyle}
      />
      <Chart downloadFields={filterDataByDate} />
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
