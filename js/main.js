$(function(){
  
  $(".skill_per").each(function(){
    $this = $(this);
    var per = $(this).attr("per");
    $this.css("width", per + "%");
  });
});


$('a[href^="#"').on('click', function() {
    const headerElHeight =  document.querySelector('.header').clientHeight;
    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top-headerElHeight
    });
    return false;
});


(function () {


    const header = document.querySelector('.header');
    const scroll = document.querySelector('.scroll-up');
    const empty = document.querySelector('.empty__block');

    window.onscroll = () => {
        if(window.pageYOffset > 725){

            scroll.classList.add('scroll__active')
            header.classList.add('sticky__header')
            empty.classList.add('empty__active')            
        }else{
            scroll.classList.remove('scroll_active')
            header.classList.remove('sticky__header')
            empty.classList.remove('empty__active')
            
        }
    }
}());