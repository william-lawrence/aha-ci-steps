aha.on("circleWebhook", ({ headers, payload }, { identifier, settings }) => {
  if (payload.pipeline.vcs.branch !== "master") {
    return;
  }

  const url =
    "https://big.aha.io/api/v1/products/ENG/custom_objects/circleci_workflows/records";

  const body = {
    custom_object_record: {
      custom_fields: {
        id: payload.workflow.id,
        start_at: payload.workflow.created_at,
        end_at: payload.workflow.stopped_at,
        branch: payload.pipeline.vcs.branch,
        workflow_status: payload.workflow.status,
        workflow_url: payload.workflow.url,
      },
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer ",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    });
});
