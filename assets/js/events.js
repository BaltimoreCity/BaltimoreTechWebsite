---
---

const events = [

  {% for year in site.data.events %}
    {% for month in year[1] %}
      {% for event_hash in month[1] %}
        {% assign event = event_hash[1] %}
        {{event | jsonify}},
      {% endfor %}
    {% endfor %}
  {% endfor %}
]
.filter(event => moment(event.local_date).diff(moment(), 'day') >= 0)
.sort((a, b) => moment(`${a.local_date} ${a.local_time}`).diff(moment(`${b.local_date} ${b.local_time}`)));

function initSearch() {
  // const options = {
  //   valueNames: [
  //     "event.title",
  //     "event.location",
  //     "event.type",
  //     "event.date",
  //     "event.time",
  //     "event.summary"
  //   ]
  // };
  // const eventList = new List("eventsPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    const searchKey = new RegExp(value, 'i')
    // eventList.search(value);

    function contains(entity) {
      return searchKey.test(entity)
    }
    function match_event(event) {
      return contains(event.name) ||
      contains(event.description) ||
      event.venue && contains(event.venue.name) ||
      contains(event.group.name) ||
      contains(event.link)
    }
    const results = events.filter(match_event)

    $("#paginationContainer").pagination({
      dataSource: results,
      pageSize: 9,
      className: 'paginationjs-theme-green paginationjs-big',
      callback: function(data, pagination) {
        const html = template(data);
        $('#dataContainer').html(html);
      }
    });
  });
}


function initPagination() {
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
    const locationName = event.venue ? event.venue.name : event.group.name
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
              <strong class="event.date">${moment(event.local_date).format("MM-DD-YYYY")}</strong
              ><br />
              <strong class="event.time">${moment(event.local_time, 'hh:mm').format('hh:mmA')}</strong> <br />
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
          <p class="event-summary event.summary">${event.description || ''}</p>
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
