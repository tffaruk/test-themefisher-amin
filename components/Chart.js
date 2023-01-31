import dynamic from "next/dynamic";
const ReactChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const dateFormat = (date) => {
  return `${new Date(date).getDate()} ${new Date(date).toLocaleDateString(
    "en-US",
    { month: "long" }
  )}`;
};

const Chart = ({ downloadFields }) => {
  // get All date
  const allDate = downloadFields
    .map(({ downloads }) => downloads.map(({ date }) => dateFormat(date)))
    .flat();

  // all unique date
  const datearray = [
    ...new Set(
      allDate.sort((a, b) => new Date(a).getDate() - new Date(b).getDate())
    ),
  ];
  // add zero on download field if date is not exist
  const addZeroOnEmptyDate = (datearray, downloads) => {
    const state = datearray.map((uniqDate) => {
      return (
        downloads.find(({ date }) => dateFormat(date) === uniqDate) || {
          date: uniqDate,
          download: 0,
        }
      );
    });
    return state;
  };
  // format with zero
  const formteDataByDate = downloadFields.map((el) => {
    return {
      ...el,
      downloads: addZeroOnEmptyDate(datearray, el.downloads),
    };
  });

  // all downloaded data
  const allDownloadData = formteDataByDate
    .map((data) => {
      return {
        name: data.name,
        data: data.downloads.map((el) => el.download),
      };
    })
    .slice(0, 5);

  const optionssalesoverview = {
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      labels: datearray,
      xaxis: {
        // categories: date,
        // type: "datetime",

        legend: {
          position: "bottom",
          horizontalAlign: "right",
          floating: true,
          offsetY: 25,
          offsetX: 5,
        },
      },

      stroke: {
        width: [4, 4, 4, 4, 4],
        curve: "smooth",
      },

      yaxis: {
        title: {
          text: "Download",
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    },
    series: allDownloadData,
  };

  return (
    <ReactChart
      options={optionssalesoverview.options}
      series={optionssalesoverview.series}
      height="295px"
    />
  );
};

export default Chart;
