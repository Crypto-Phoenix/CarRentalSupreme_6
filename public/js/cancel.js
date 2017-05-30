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

$( "#hej" ).mouseout(function() {
//	$(this).css("background-color","white");
});
$("#hej").on('click','li',function (){
	//$(this).css("background-color","yellow");
    //alert($(this).text());
    var txt= $(this).text();
    var lastword = txt.split(" ").pop();
    console.log(lastword);
    $("#reg").attr("action", "/booked/" +lastword);

//confirm("Press a button!");


});

});