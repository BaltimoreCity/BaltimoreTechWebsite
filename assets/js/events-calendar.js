---
---
$(document).ready(function() {
  const initDate = moment();
  const events = eventListing("#events-list", initDate);

  const $calendarMonth = $(".events-calendar .calendar .calendar-month");
  const $calendarYear = $(".events-calendar .calendar .calendar-year");
  const $eventMonthSelect = $(".events-calendar .selectized.month");
  const $eventTypeSelect = $(".events-calendar .selectized.event-type");
  const $bsCalendar = $("#inlineCalendar");
  // init
  $calendarMonth.html(initDate.format("MMMM"));
  $calendarYear.html(initDate.format("YYYY"));

  $bsCalendar.datetimepicker({
    inline: true,
    format: "L"
  });

  $bsCalendar.on("change.datetimepicker", function(e) {
    // clicked on calendar's day
  });

  $eventMonthSelect.selectize({
    onChange: function(value) {
      events.filterByMonth(value);
      $calendarMonth.html(getMonth(value));
    }
  });

  $eventTypeSelect.selectize({
    onChange: function(value) {
      events.filterByType(value);
    }
  });
});

function eventListing(containerId, initialDate = moment()) {
  const data = {{site.data.events | jsonify}};
  const $container = $(containerId);
  const $listGroup = $(`<div class="list-group"></div>`);
  const filterdate = initialDate;
  var filterEventType = "all";

  function listGroupItem(date, links) {
    return $(`<div class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between mb-3 align-items-center">
        <h4>${moment(date).format("M.DD.YY")}</h4>
        <h6 class="text-uppercase">${moment(date).format("ddd")}.</h6>
      </div>
      <ul class="list-unstyled text-left">
        ${links}
      </ul>
    </div>`);
  }

  function listItem(event) {
    return `<li>${event.local_date} - ${event.local_time} | ${event.name}&nbsp;&nbsp;<a href="${event.link}" target="_blank" class="btn btn-olive event-btn">sign up</a></li>`;
  }

  const render = function() {
    $listGroup.empty();
    const year = filterdate.year(),
      month = filterdate.month() + 1;
    let events = data[year][month] || [];
    if(typeof events === "object"){
      // convert events object to array
      events = Object.keys(events).map(k => events[k]);
    }

    // sort the events
    events.sort((a, b) => moment(a.local_date).diff(moment(b.local_date)));

    const filteredEvents =
      filterEventType === "all" || filterEventType === 'meetup'
        ? events
        : events.filter(event => event.type === filterEventType);

    if (filteredEvents.length) {
      const eventsByDate = filteredEvents.reduce(function(acc, event) {
        if (acc[event.local_date]) {
          acc[event.local_date].push(event);
        } else {
          acc[event.local_date] = [event];
        }
        return acc;
      }, {});

      const $items = Object.keys(eventsByDate).map(key => {
        const dateEvents = eventsByDate[key];
        const eventLinks = dateEvents.map(e => listItem(e));
        return eventLinks.length ? listGroupItem(key, eventLinks.join("")) : "";
      });

      $listGroup.append($items);
    } else {
      $listGroup.append("No results");
    }

    $container.append($listGroup);
  };

  render();

  return {
    filterByYear: function(year) {
      filterdate.year(year);
      render();
    },
    filterByMonth: function(month) {
      filterdate.month(month);
      render();
    },
    filterByType: function(type) {
      filterEventType = type.toLowerCase();
      render();
    }
  };
}

function toggleEventsCalendar() {
  const $calendarSlider = $("#eventsCalendarSlider");
  const active = $calendarSlider.hasClass("show");
  if (active) $calendarSlider.removeClass("show");
  else $calendarSlider.addClass("show");
}

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
