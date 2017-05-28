/*
  Function to control that a radiobutton is marked before continuing to next page
*/
$(document).ready(function() {
  $("#submitCar").click((e) => {
    if (!($("input[type=radio]").is(":checked"))) {
      e.preventDefault();
      alert("Please select a car!");
    }
  });
});
