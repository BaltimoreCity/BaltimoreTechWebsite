---
---

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

function initPagination() {
  const jobs = [
    {% for job in site.jobs %}
    {
      title: `{{job.title}}`,
      position: `{{job.position}}`,
      company: `{{job.company}}`,
      location: `{{job.location}}`,
      tag: `{{job.tag}}`,
      url: `{{job.url | prepend: site.baseurl}}`
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  $("#paginationContainer").pagination({
    dataSource: jobs,
    pageSize: 9,
    className: 'paginationjs-theme-green paginationjs-big',
    callback: function(data, pagination) {
      const html = template(data);
      $('#dataContainer').html(html);
    }
  });
}

function template(data) {
  let html = `<div class="row list">`;
  $.each(data, function(index, item) {
    const listItem = `
    <div class="col-sm-6 col-lg-4 mb-5">
      <div class="job-card">
        <div class="job-details">
          <div class="job-title job.title">${item.position}</div>
          <div class="job-company job.company">${item.company}</div>
          <a
            class="apply btn btn-olive text-uppercase rounded-pill"
            href="${item.url}"
          >
            Apply
          </a>
        </div>
        <div class="job-location">
          <small class="job.tags"
            ><strong>${item.tag}</strong></small
          ><br /><br />
          <strong style="font-size: 14px;" class="job.location">${
            item.location
          }</strong>
        </div>
      </div>
    </div>
    `;
    html += listItem;
  });
  html += `</div>`;
  return html;
}

$(document).ready(function() {
  initPagination();
  initSearch();
});
