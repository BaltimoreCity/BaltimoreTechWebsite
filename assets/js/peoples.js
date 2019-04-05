---
---
$(document).ready(function() {
  const options = {
    valueNames: [
      "people.name",
      "people.profession",
      "people.education",
      "people.skills"
    ],
    page: 9,
    pagination: {
      innerWindow: 3,
      outerWindow: 3,
      left: 3,
      right: 3
    }
  };
  const peopleList = new List("peoplesPage", options);

  $('.no-result').hide()
  peopleList.on('updated', function(list) {
    if (list.matchingItems.length > 0) {
      $('.no-result').hide()
    } else {
      $('.no-result').show()
    }
  });
});
