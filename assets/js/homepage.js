// scripts for homepage
function initLatestJobsCarousel() {
  $("#latestJobsCarousel").owlCarousel({
    margin: 30,
    nav: true,
    navText: [
      `<i class="fas fa-arrow-circle-left"></i>`,
      `<i class="fas fa-arrow-circle-right"></i>`
    ],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
}

function initMainSearch() {
  $("#mainSearch").selectize({
    valueField: "url",
    labelField: "name",
    searchField: "name",
    create: false,
    render: {
      option: function(item, escape) {
        return `<div class="search-result-item">${escape(item.name)}</div>`;
      }
    },
    load: function(query, callback) {
      if (!query.length) return callback();
      $.ajax({
        url:
          "https://api.github.com/legacy/repos/search/" +
          encodeURIComponent(query),
        type: "GET",
        error: function() {
          callback();
        },
        success: function(res) {
          callback(res.repositories.slice(0, 10));
        }
      });
    }
  });
}

$(document).ready(function() {
  initLatestJobsCarousel();
  initMainSearch();
});
