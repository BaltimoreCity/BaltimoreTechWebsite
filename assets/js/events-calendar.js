function getMonth(s) {
  switch (s) {
    case "jan":
      return "January";
    case "feb":
      return "February";
    case "mar":
      return "March";
    case "apr":
      return "April";
    case "may":
      return "May";
    case "jun":
      return "June";
    case "jul":
      return "July";
    case "aug":
      return "August";
    case "sep":
      return "September";
    case "oct":
      return "October";
    case "nov":
      return "November";
    case "dec":
      return "December";
  }
}

function toggleEventsCalendar() {
  const $calendarSlider = $("#eventsCalendarSlider");
  const active = $calendarSlider.hasClass("show");
  if (active) $calendarSlider.removeClass("show");
  else $calendarSlider.addClass("show");
}

function loadEvents() {
  // mock loading data
  $(".events-list .list-group").hide();
  $(".events-list .spinner-grow").show();
  setTimeout(function() {
    $(".events-list .list-group").show();
    $(".events-list .spinner-grow").hide();
  }, Math.random() * 1500 + 500);
}

$(document).ready(function() {
  $(".events-calendar .selectized.month").selectize({
    onChange: function(value) {
      $(".events-calendar .calendar .calendar-month").html(getMonth(value));
      loadEvents();
    }
  });
  $(".events-calendar .selectized.event-type").selectize({
    onChange: function(value) {
      loadEvents();
    }
  });
  $("#inlineCalendar").datetimepicker({
    inline: true,
    format: "L"
  });
  $("#inlineCalendar").on("change.datetimepicker", function(e) {
    loadEvents();
  });
});
