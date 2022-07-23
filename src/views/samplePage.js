import React, { useState } from "react";

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

aha.on("samplePage", ({ fields, onUnmounted }, { identifier, settings }) => {
  return <Foo></Foo>;
});

function getRecentWorkflowData(daysSinceUpdated, callback) {
  let date = new Date();
  date.setDate(date.getDate() - daysSinceUpdated); // We want to get all the workflows on master for the last N days

  const url = `https://big.aha.io/api/v1/products/ENG/custom_objects/circleci_workflows/records`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer ",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      callback(json);
    });
}

function calculateSuccessRate(workflows, daysSinceUpdated) {
  const dateFilteredWorkflows = filterWorkflowsByDate(
    workflows,
    daysSinceUpdated
  );

  if (dateFilteredWorkflows.length === 0) {
    return 0;
  }

  let totalWorkflows = dateFilteredWorkflows.length;
  let successCount = 0;

  dateFilteredWorkflows.forEach((workflow) => {
    const statusWorkflows = workflow.custom_fields.filter(
      (field) => field.name === "workflow_status" && field.value === "success"
    );

    successCount += statusWorkflows.length;
  });

  return (successCount / totalWorkflows) * 100;
}

function filterWorkflowsByDate(workflows, daysSinceUpdated) {
  let filterDate = new Date();
  filterDate.setDate(filterDate.getDate() - daysSinceUpdated);

  const dateFilteredWorkflows = workflows.custom_object_records.filter(
    (record) => new Date(record.created_at) > filterDate
  );

  return dateFilteredWorkflows;
}

function Foo(props) {
  const [workflows, setWorkflows] = useState(null);

  getRecentWorkflowData(1, setWorkflows);

  let oneDaySuccessRate;
  let sevenDaySuccessRate;

  if (workflows) {
    oneDaySuccessRate = calculateSuccessRate(workflows, 1);
    sevenDaySuccessRate = calculateSuccessRate(workflows, 7);
  }

  return (
    <>
      <Styles />
      <div className="title">
        Success rate for the last 24 Hours: {oneDaySuccessRate}%
      </div>
      <div className="title">
        Success rate for the last 7 Days: {sevenDaySuccessRate}%
      </div>
      <div>{getRecentWorkflowData()}</div>
    </>
  );
}
