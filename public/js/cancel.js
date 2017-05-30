$(document).ready(function() {


/*$('#hej').attr('id', function(i) {
   //return 'nr'+(i+1);
      console.log('nr'+(i+1));

});*/
$( "#hej" ).mouseover(function() {
 	//$(this).css("background-color","black");  
});

  /* $("#hej").hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "pink");
    });*/
//console.log("hej");
/*
$("#hej").on('click','li',function (){
	//$(this).css("background-color","yellow");
    //alert($(this).text());
    var txt= $(this).text();
    var lastword = txt.split(" ").pop();
    console.log("hej"+lastword);
   // $("#reg").attr("action", "/booked/" +lastword);
   //$("#reg").attr("action", lastword);
//confirm("Press a button!");

});
*/


  $("#submitForm").click((e) => {

let t="Tjena!";
alert(t);
  e.preventDefault();
    });
});