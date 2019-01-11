function initFields() {
  $("#event-date").datetimepicker({
    format: "L"
  });
  $("#event-time").datetimepicker({
    format: "LT"
  });
}

$(document).ready(function() {
  initFields();
});
