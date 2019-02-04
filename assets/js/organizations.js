function initSearch() {
  const options = {
    valueNames: ["org.name", "org.location", "org.description"]
  };
  const orgList = new List("orgPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    orgList.search(value);
  });
}

$(document).ready(function() {
  initSearch();
});
