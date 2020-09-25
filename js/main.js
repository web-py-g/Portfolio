$(function(){
  
  $(".skill_per").each(function(){
    $this = $(this);
    var per = $(this).attr("per");
    $this.css("width", per + "%");
  });
});


$('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});


(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if(window.pageYOffset > 722){
            header.classList.add('sticky__header')
        }else{
            header.classList.remove('sticky__header')
        }
    }
}());