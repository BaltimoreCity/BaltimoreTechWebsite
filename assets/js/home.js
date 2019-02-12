---
---

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

function initSearch() {
  const sjs = SimpleJekyllSearch({
    searchInput: document.getElementById("search"),
    resultsContainer: document.getElementById("search-results"),
    json: `{{"/search.json" | prepend: site.baseurl}}`,
    searchResultTemplate: `<a href="{url}" target="_blank" class="result-item">{title}</a>`,
    exclude: ["job"]
  });

  return {
    sjs,
    byEvents: function() {
      sjs.repo.setOptions({
        exclude: ["job"]
      });
    },
    byJobs: function() {
      sjs.repo.setOptions({
        exclude: ["event"]
      });
    }
  };
}

$(document).ready(function() {
  initLatestJobsCarousel();
  const search = initSearch();

  const clear = () => {
    $('#search').val('');
    search.sjs.empty();
  };

  $('.search-bar .dropdown-menu .dropdown-item:first-child').on('click', function(){
    clear();
    search.byJobs();
  });

  $('.search-bar .dropdown-menu .dropdown-item:last-child').on('click', function(){
    clear();
    search.byEvents();
  })
});
