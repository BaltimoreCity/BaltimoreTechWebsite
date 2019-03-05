---
---

function initSearch() {
  const options = {
    valueNames: [
      "people.name",
      "people.profession",
      "people.education",
      "people.skills"
    ]
  };
  const peopleList = new List("peoplesPage", options);
  $("#search").on("keyup", function(e) {
    const value = $(this).val();
    peopleList.search(value);
  });
}

function initPagination() {
  const peoples = [
    {% for people_hash2 in site.data.peoples %}
    {% for people_hash in people_hash2[1] %}
    {% assign people = people_hash[1] %}
      {
        name: `{{people.name}}`,
        type: `{{people.type}}`,
        profession: `{{people.profession}}`,
        education: `{{people.education}}`,
        skills: {{people.skills | jsonify}},
        image_url: `{{people.picture}}`,
        resume_url: `{{resume.url}}`,
        twitter_url: `{{people.links.twitter}}`,
        facebook_url: `{{people.links.facebook}}`,
        linkedin_url: `{{people.links.linkedin}}`,
        github_url: `{{people.links.github}}`,
        website_url: `{{people.links.website}}`,
      },
    {% endfor %}
    {% endfor %}
  ];

  $("#paginationContainer").pagination({
    dataSource: peoples,
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

  $.each(data, function(index, people) {

    const peopleHtml = `
      <div class="col-sm-11 people-card ${people.type}">
        <div class="row">
          <div class="col-sm-12 col-lg-3 mb-4 text-center">
            <img
              src="${people.image_url}"
              alt="${people.name}"
              class="people-thumbnail"
            />
          </div>
          <div class="col-sm-8 col-lg-7 mb-4">
            <h3 class="text-uppercase people.name">
              <strong>${people.name}</strong>
            </h3>
            <h6 class="mb-4 people.profession">${people.profession}</h6>
            <h6 class="mb-4 people.education">${people.education}</h6>
            <ul class="list-inline social-list">
              <li class="list-inline-item">
                <a href="https://slack.com" target="_blank"
                  ><i class="fab fa-slack"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="${people.twitter_url}" target="_blank"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="${people.linkedin_url}" target="_blank"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="${people.facebook_url}" target="_blank"
                  ><i class="fab fa-facebook"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="${people.github_url}" target="_blank"
                  ><i class="fab fa-github-alt"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="${people.website_url}" target="_blank">
                  <i class="fa fa-link"></i>
                </a>
              </li>
            </ul>
            <a
              href="${people.resume_url}"
              class="btn-resume btn btn-dark text-uppercase rounded-pill"
            >
              Resume
            </a>
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul class="people.skills list-unstyled skills-list">
              ${people.skills.map(skill => `<li>${skill}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    html += peopleHtml;
  })

  return html;
}

$(document).ready(function() {
  initPagination();
  initSearch();
});
