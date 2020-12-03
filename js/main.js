function skil_bar(){
  $(".skill_per").each(function(){
    $this = $(this);
    var per = $(this).attr("per");
    $this.css("width", per + "%");
  });
};

const animItems = document.querySelectorAll('._anim__items');

if(animItems.length > 0){

    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for (let i = 0; i < animItems.length; i++) {

            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;


            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                let animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > (animItemOffset - animItemPoint)) && (pageYOffset < (animItemOffset + animItemHeight))){
                
                animItem.classList.add('_active');
            } else{
                if(!animItem.classList.contains('_anim__no')){
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(elem){
    const rect = elem.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }        
    }
    animOnScroll()
}



(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(time,start,target,dur) {
            time /= dur / 2;
            if (time < 1) return target / 2 * time * time + start;
            time--;
            return -target / 2 * (time * (time - 2) - 1) + start;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);

            });
        });
    };
    scrollTo();
}());


(function () {


    const header = document.querySelector('.header');
    const scroll = document.querySelector('.scroll-up');
    const empty = document.querySelector('.empty__block');

    window.onscroll = () => {
        if(window.pageYOffset > (window.innerHeight)*1.8){
            // console.log(window.innerHeight)
            skil_bar();
        }


        if(window.pageYOffset > window.innerHeight){
            // console.log(window.innerHeight)
            
            scroll.classList.add('scroll__active')
            header.classList.add('sticky__header')
            empty.classList.add('empty__active')            
        }else{
            scroll.classList.remove('scroll__active')
            header.classList.remove('sticky__header')
            empty.classList.remove('empty__active')
            
        }
    }
}());



var popup = document.querySelector('.popup');
var openPopup = document.querySelector('.contact_link');


var closePopup = popup.querySelector('.popup_close');
var closeArea = popup.querySelector('.popup_area');

var k = 0;

openPopup.addEventListener('click', function() {
    k+=1;
    popup.classList.add('popup__active');
    if (k == 3) {
        console.log(occurrences);

    }
});


closePopup.addEventListener('click', function() {
    popup.classList.remove('popup__active');
});

closeArea.addEventListener('click', function(){
    popup.classList.remove('popup__active');
});



// var popupIMG = document.querySelector('.popup__image');
// var openPopupIMG = document.querySelector('.popup__image__link')
// var closePopupIMG = popupIMG.querySelector('.popup__image_close')
// var closeAreaIMG = popupIMG.querySelector('.popup__image_area')


// openPopupIMG.addEventListener('click', function() {
//     popupIMG.classList.add('popup__image__active');
// });

// closePopupIMG.addEventListener('click', function() {
//     popupIMG.classList.remove('popup__image__active');
// });

// closeAreaIMG.addEventListener('click', function(){
//     popupIMG.classList.remove('popup__image__active');
// });







var all = document.getElementsByTagName('*')[0];


var small = []
 for (var i = 0; i < document.getElementsByTagName('*').length -1; i++){
    small.push((jQuery(all.getElementsByTagName('*')[i]).prop("tagName")));
}

var occurrences = {};

for (var i = 0, j = small.length; i < j; i++) {
   occurrences[small[i]] = (occurrences[small[i]] || 0) + 1;
}


