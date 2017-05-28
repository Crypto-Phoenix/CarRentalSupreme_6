/*
  Function for calendar buildup, including a preventDefault
  if the user don't mark both the "from"- and the "to"-date.
*/
$(document).ready(function() {

  let dateFormat = "yy/mm/dd";
  let from = $("#dateFrom").datepicker({
    minDate: 0,
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 2
  }).on("change", () => {
    to.datepicker("option", "minDate", getDate(this));
  });

  let to = $("#dateTo").datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 2
  }).on("change", () => {
    from.datepicker("option", "maxDate", getDate(this));
  });

  function getDate(element) {
    let date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch(error) {
      date = null;
    }

    return date;
  }

  $("#submitForm").click((e) => {
    let fromDate = from.val();
    let toDate = to.val();
    if (fromDate === "" || toDate === "") {
      e.preventDefault();
      alert("Please select both dates!");
    }
  });
});
