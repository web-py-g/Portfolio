$(function(){
  
  $(".skill_per").each(function(){
    $this = $(this);
    var per = $(this).attr("per");
    $this.css("width", per + "%");
  });
});