---
---

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

function initPagination() {
  const orgs = [
    {% for org_hash in site.data.organizations %}
    {% assign org = org_hash[1] %}
      {
        name: `{{org.name}}`,
        location: `{{org.location}}`,
        description: `{{org.description}}`,
        image_url: `{{org.image | prepend: site.baseurl}}`,
        url: `{{org.url}}`
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  $("#paginationContainer").pagination({
    dataSource: orgs,
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

  $.each(data, function(index, org){
    const orgHtml = `
      <div class="col-sm-10 m-auto">
        <div class="org-card">
          <div class="row">
            <div class="col-auto mb-3">
              <img
                src="${org.image_url}"
                class="thumbnail"
              />
            </div>
            <div class="col flex-grow-1">
              <h3 class="font-weight-bold mb-4 org.name">${org.name}</h3>
              <h6 class="font-weight-bold org.location">${org.location}</h6>
            </div>
            <div class="col-auto">
              <a
                href="${org.url}"
                target="_blank"
                class="btn btn-olive btn-sm rounded-pill px-3 py-1 text-white mb-3"
                >Website</a
              >
              <br />
              <a href="#" class="link">View jobs</a>
            </div>
          </div>
          <div>
            <p class="description org.description">${org.description}</p>
          </div>
        </div>
      </div>
    `;

    html += orgHtml;
  });
  return html;
}

$(document).ready(function() {
  initPagination();
  initSearch();
});
