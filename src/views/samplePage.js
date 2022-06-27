import React from "react";

const Styles = () => {
  return (
    <style>
      {`
    .title {
      color: var(--aha-green-800);
      font-size: 20px;
      text-align: center;
      margin: 20px;
    }
    `}
    </style>
  );
};

function getRecentWorkflowData() {
  const url =
    "https://circleci.com/api/v2/insights/gh/aha-app/aha-app/workflows?branch=master&reporting-window=last-7-days";
  const settings = {
    method: "GET",
    headers: {
      "Circle-Token": "",
      Host: "circleci.com",
      "content-type": "application/json",
      Accept: "application/json",
    },
    mode: "no-cors",
  };

  fetch(url, settings)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}

aha.on("samplePage", ({ fields, onUnmounted }, { identifier, settings }) => {
  return (
    <>
      <Styles />
      <div className="title">Sample Page. You made it!</div>
      <div>{getRecentWorkflowData()}</div>
    </>
  );
});
