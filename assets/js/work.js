function initSearch() {
  const options = {
    valueNames: ["job.title", "job.company", "job.location", "job.tags"]
  };
  const workList = new List("workPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    workList.search(value);
  });
}

$(document).ready(function() {
  initSearch();
});
