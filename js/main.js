let nav = document.querySelector(".navbar");
let navHeight = nav.scrollHeight;
let headerContent = document.querySelector(".header-content");
let headrArrow = document.querySelector(".header-arrow");
let meetSection = document.querySelector("#meet");
let monsters = document.querySelectorAll(".monster");

function isInViewPort(ele){
    const eleTop = ele.offsetTop;
    const eleBottom = ele.offsetTop + ele.offsetHeight;
    const viewPortTop = window.scrollY;
    const viewPortBottom = window.scrollY + window.innerHeight;

    // console.log(`${eleTop} < ${viewPortBottom})`); // حافة العنصر العلوية اصغر من حافة النافذة السفلية
    // console.log(`${eleBottom} > ${viewPortTop}); // حافة العنصر السفلية اكبر من حافة النافذة العلوية

    if(eleTop < viewPortBottom && eleBottom > viewPortTop)  return true;
}

monsters.forEach((ele,i)=>ele.style.animationDelay = `${i * 0.1}s`)

function headerAnimation(){
    let top = window.scrollY;
    // animate nav to appear when page scroll down
    let targetNavPosition = meetSection.getBoundingClientRect().top - navHeight;
    targetNavPosition < 0 ? nav.classList.add('scroll-bg') : nav.classList.remove('scroll-bg');


    // parallax header content
    headerContent.style.transform = `translateY(-${top/2}px)`;

    // remove arrow icon when page scroll down
    headerContent.getBoundingClientRect().top < 0 ? headrArrow.classList.add("d-none") : headrArrow.classList.remove("d-none");

    monsters.forEach((ele)=>
    isInViewPort(ele) ?
    ele.classList.add("appear") :
    ele.classList.remove("appear"));

    window.requestAnimationFrame(headerAnimation);
    
}
window.requestAnimationFrame(headerAnimation);


(function(){

  let controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '#friends',
        triggerHook:0.2
    })
    .setClassToggle('.friend-text', 'appear')
    .addTo(controller)


    // friends section
    let parachuteTween = new TimelineMax();
    parachuteTween.from('#parachute', {
        scale: 0.5,
        opacity: 0.25,
        rotation: -40,
        x: '100%',
        y: '-200%',
      }).to('#parachute', {
        x: '30%',
        y: '20%',
        rotation: -30,
      }).to('#parachute', {
        x: '-50%',
        y: '180%',
        rotation: 30,
      })

  
    new ScrollMagic.Scene({
      triggerElement: '#friends',
      triggerHook: 0.4,
      duration:'105%'
    })
      .setTween(parachuteTween)
      .addTo(controller)

    // types section
    let typesTween = new TimelineMax();
    typesTween.from('.types-card',{
      scale:0.5,
      opacity:0,
      stagger:0.4,
    })


    new ScrollMagic.Scene({
      triggerElement:'#types',
      triggerHook:0.3,
    })
    .addTo(controller)
    .setTween(typesTween)

    // hire section
    let hireTween = new TimelineMax();
    hireTween.from('#hire .col',{
      scale:0.5,
      opacity:0,
      y:'-200%',
      stagger:0.4
    })

    new ScrollMagic.Scene({
      triggerElement:'#hire',
      triggerHook:0.6,
    })
    .addTo(controller)
    .setTween(hireTween)
})();


