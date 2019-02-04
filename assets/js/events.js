function initSearch() {
  const options = {
    valueNames: [
      "event.title",
      "event.location",
      "event.type",
      "event.date",
      "event.time",
      "event.summary"
    ]
  };
  const eventList = new List("eventsPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    eventList.search(value);
  });
}

$(document).ready(function() {
  initSearch();
});
