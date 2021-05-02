function skil_bar(){
  $(".skill_per").each(function(){
    $this = $(this);
    let per = $(this).attr("per");
    $this.css("width", per + "%");
  });
};


(function () {

    window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    setInterval(loop, 1000/60); // 60 FPS
    }

  let
    canv                = document.getElementById('mc'), // canvas
    ctx                 = canv.getContext('2d'), // 2d context
    gs = fkp            = false, // game started && first key pressed (initialization states)
    speed = baseSpeed   = 3, // snake movement speed
    xv = yv             = 0, // velocity (x & y)
    px                  = ~~(canv.width) / 2, // player X position
    py                  = ~~(canv.height) / 2, // player Y position
    pw = ph             = 20, // player size
    aw = ah             = 20, // apple size
    apples              = [], // apples list
    trail               = [], // tail elements list (aka trail)
    tail                = 100, // tail size (1 for 10)
    tailSafeZone        = 20, // self eating protection for head zone (aka safeZone)
    cooldown            = false, // is key in cooldown mode
    score               = 0; // current score

  // game main loop
  function loop()
  {
    // logic
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    // force speed
    px += xv;
    py += yv;

    // teleports
    if( px > canv.width )
      {px = 0;}

    if( px + pw < 0 )
      {px = canv.width;}

    if( py + ph < 0 )
      {py = canv.height;}

    if( py > canv.height )
      {py = 0;}

    // paint the snake itself with the tail elements
    ctx.fillStyle = 'lime';
    for( let i = 0; i < trail.length; i++ )
    {
      ctx.fillStyle = trail[i].color || 'lime';
      ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
    }

    trail.push({x: px, y: py, color: ctx.fillStyle});

    // limiter
    if( trail.length > tail )
    {
      trail.shift();
    }

    // eaten
    if( trail.length > tail )
    {
      trail.shift();
    }

    // self collisions
    if( trail.length >= tail && gs )
    {
      for( let i = trail.length - tailSafeZone; i >= 0; i-- )
      {
        if(
          px < (trail[i].x + pw)
          && px + pw > trail[i].x
          && py < (trail[i].y + ph)
          && py + ph > trail[i].y
        )
        {
          // got collision
          tail = 10; // cut the tail
          speed = baseSpeed; // cut the speed (flash nomore lol xD)

          for( let t = 0; t < trail.length; t++ )
          {
            // highlight lossed area
            trail[t].color = 'red';

            if( t >= trail.length - tail )
              {break;}
          }
        }
      }
    }

    // paint apples
    for( let a = 0; a < apples.length; a++ )
    {
      ctx.fillStyle = apples[a].color;
      ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
    }

    // check for snake head collisions with apples
    for( let a = 0; a < apples.length; a++ )
    {
      if(
        px < (apples[a].x + pw)
        && px + pw > apples[a].x
        && py < (apples[a].y + ph)
        && py + ph > apples[a].y
      )
      {
        // got collision with apple
        apples.splice(a, 1); // remove this apple from the apples list
        tail += 10; // add tail length
        speed += .1; // add some speed
        spawnApple(); // spawn another apple(-s)
        break;
      }
    }
  }

  // apples spawner
  function spawnApple()
  {
    let
      newApple = {
        x: ~~(Math.random() * canv.width),
        y: ~~(Math.random() * canv.height),
        color: 'red'
      };

    // forbid to spawn near the edges
    if(
      (newApple.x < aw || newApple.x > canv.width - aw)
      ||
      (newApple.y < ah || newApple.y > canv.height - ah)
    )
    {
      spawnApple();
      return;
    }

    // check for collisions with tail element, so no apple will be spawned in it
    for( let i = 0; i < tail.length; i++ )
    {
      if(
        newApple.x < (trail[i].x + pw)
        && newApple.x + aw > trail[i].x
        && newApple.y < (trail[i].y + ph)
        && newApple.y + ah > trail[i].y
      )
      {
        // got collision
        spawnApple();
        return;
      }
    }

    apples.push(newApple);

    if( apples.length < 3 && ~~(Math.random() * 1000) > 700 )
    {
      // 30% chance to spawn one more apple
      spawnApple();
    }
  }

  // random color generator (for debugging purpose or just 4fun)
  function rc()
  {
    return '#' + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16));
  }

  // velocity changer (controls)
  function changeDirection(evt)
  {
    if( !fkp && [37,38,39,40].indexOf(evt.keyCode) > -1 )
    {
      setTimeout(function() {gs = true;}, 1000);
      fkp = true;
      spawnApple();
    }

    if( cooldown )
      {return false;}

    /*
      4 directional movement.
     */
    if( evt.keyCode == 37 && !(xv > 0) ) // left arrow
      {xv = -speed; yv = 0;}

    if( evt.keyCode == 38 && !(yv > 0) ) // top arrow
      {xv = 0; yv = -speed;}

    if( evt.keyCode == 39 && !(xv < 0) ) // right arrow
      {xv = speed; yv = 0;}

    if( evt.keyCode == 40 && !(yv < 0) ) // down arrow
      {xv = 0; yv = speed;}

    cooldown = true;
    setTimeout(function() {cooldown = false;}, 100);
    evt.preventDefault();
  }
}());




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
            skil_bar();
        }


        if(window.pageYOffset > window.innerHeight){
            
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



let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.contact_link');


let closePopup = popup.querySelector('.popup_close');
let closeArea = popup.querySelector('.popup_area');

openPopup.addEventListener('click', function() {

    popup.classList.add('popup__active');
});


closePopup.addEventListener('click', function() {
    popup.classList.remove('popup__active');
});

closeArea.addEventListener('click', function(){
    popup.classList.remove('popup__active');
});