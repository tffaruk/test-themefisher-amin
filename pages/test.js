import FullLayout from "@layouts/FullLayout";
import React from "react";

const test = () => {
  const data = [
    {
      name: "next",
      details: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
    },
    {
      name: "hugo",
      details: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
    },
  ];
  const i = 2;
  const j = 3;
  const test = data.map((el) => {
    const data = el.details.reduce((p, c) => p + (c.id >= i && c.id <= j), 0);
    var between = el.details.filter(function (item) {
      return item.id >= i && item.id <= j;
    });
    return {
      ...el,
      details: between,
    };
  });
  console.log(test);
  var lower = 18;
  var upper = 20;

  console.log(test);
  return (
    <FullLayout>
      <div>test</div>
    </FullLayout>
  );
};

export default test;
