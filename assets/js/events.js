---
---

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

function initPagination() {
  const events = [

    {% for year in site.data.events %}
      {% for month in year[1] %}
        {% for event_hash in month[1] %}
          {% assign event = event_hash[1] %}
          {{event | jsonify}},
        {% endfor %}
      {% endfor %}
    {% endfor %}
  ];

  $("#paginationContainer").pagination({
    dataSource: events,
    pageSize: 9,
    className: 'paginationjs-theme-green paginationjs-big',
    callback: function(data, pagination) {
      const html = template(data);
      $('#dataContainer').html(html);
    }
  });
}

function template(data) {
  let html = '';
  $.each(data, function(index, event){
    const locationObj = event.venue || event.group
    const locationName = locationObj.name
    const eventType = 'meetup'
    const eventHtml = `
      <div class="col-sm-10">
        <div class="event-card ${event.type}">
          <div class="event-type ${eventType}">#${eventType}</div>
          <div class="d-flex justify-content-between">
            <div class="event-details">
              <h4 class="mb-3 event.title">
                <strong>${event.name}</strong>
              </h4>
              <h6 class="event.location">
                <strong>${locationName}</strong>
              </h6>
            </div>
            <div class="event-date">
              <strong class="event.date">${event.local_date}</strong
              ><br />
              <strong class="event.time">${event.local_time}</strong> <br />
                <a
                  href="${ event.link }"
                  target="_blank"
                >
              <button class="btn btn-olive rounded-pill text-white mt-2">
                  Register
              </button>
                </a>
            </div>
          </div>
          <p class="event-summary event.summary">${event.description}</p>
        </div>
      </div>
    `;
    html += eventHtml;
  });
  return html;
}

$(document).ready(function() {
  initPagination();
  initSearch();
});
