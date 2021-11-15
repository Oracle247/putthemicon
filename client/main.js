gsap.to("#pic", {
  scrollTrigger: {
    scrub: 1
  },
  y: 200,
})

function toggle(){
  var header = document.getElementById("header");
  header.classList.toggle('active');
   
}

console.log("hi")



// document.addEventListener('DOMContentLoaded', () => {
//   let controller = new ScrollMagic.Controller();
  
//   let timeline = new TimelineMax()
//   .add([
//     TweenMax.to("#pic", 1, {backgroundPosition: "-40% 0", ease: Linear.easeNone})
//   ]);
//   timeline
//   .to('#pic', 6, {
//     y: -100
//   })

//   let scene = new ScrollMagic.Scene({
//     triggerElement: 'section',
//     duration: '200s',
//     triggerHook: 0
//   })
//   .setTween(timeline)
//   .setPin('section')
//   .addTo(controller);
// })

// let pic = document.getElementById('pic');

// window.addEventListener('scroll', function(){
//   let value = window.scrollY;
//   pic.style.top = value * 0.5 + 'px';
// })
