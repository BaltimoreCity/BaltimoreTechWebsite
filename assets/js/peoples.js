function initSearch() {
  const options = {
    valueNames: [
      "people.name",
      "people.profession",
      "people.education",
      "people.skills"
    ]
  };
  const peopleList = new List("peoplesPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    peopleList.search(value);
  });
}

$(document).ready(function() {
  initSearch();
});
