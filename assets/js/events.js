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
    {% for event in site.data.upcoming-events %}
      {{event | jsonify}}{% unless forloop.last %},{% endunless %}
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
    const eventHtml = `
      <div class="col-sm-10">
        <div class="event-card ${event.type}">
          <div class="event-type event.type">#${event.type}</div>
          <div class="d-flex justify-content-between">
            <div class="event-details">
              <h4 class="mb-3 event.title">
                <strong>${event.title}</strong>
              </h4>
              <h6 class="event.location">
                <strong>${event.location}</strong>
              </h6>
            </div>
            <div class="event-date">
              <strong class="event.date">${event.date}</strong
              ><br />
              <strong class="event.time">${event.time}</strong> <br />
              <button class="btn btn-olive rounded-pill text-white mt-2">
                Register
              </button>
            </div>
          </div>
          <p class="event-summary event.summary">${event.summary}</p>
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
