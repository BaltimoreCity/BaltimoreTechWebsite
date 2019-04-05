---
---

$(document).ready(function() {
  const options = {
    valueNames: ["org.name", "org.location", "org.description"],
    page: 9,
    pagination: {
      innerWindow: 3,
      outerWindow: 3,
      left: 3,
      right: 3
    }
  };
  const orgList = new List("orgPage", options);
  $('.no-result').hide()
  orgList.on('updated', function(list) {
    if (list.matchingItems.length > 0) {
      $('.no-result').hide()
    } else {
      $('.no-result').show()
    }
  });
});
