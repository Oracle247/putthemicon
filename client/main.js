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

