
gsap.registerPlugin(ScrollTrigger);

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");
if(menu){
  menu.addEventListener("click",()=>nav.classList.toggle("open"));
}

gsap.from(".nav-inner",{y:-25,opacity:0,duration:.7,ease:"power3.out"});
gsap.from(".hero-copy > *",{y:35,opacity:0,duration:.75,stagger:.12,ease:"power3.out"});
gsap.from(".hero-slider",{scale:.92,opacity:0,duration:1,ease:"power3.out",delay:.2});

gsap.utils.toArray(".section-head").forEach(el=>{
  gsap.from(el,{y:35,opacity:0,duration:.7,ease:"power3.out",
    scrollTrigger:{trigger:el,start:"top 85%",once:true}});
});
gsap.utils.toArray(".card").forEach((card,i)=>{
  gsap.from(card,{y:45,opacity:0,scale:.97,duration:.65,delay:(i%3)*.08,ease:"power3.out",
    scrollTrigger:{trigger:card,start:"top 90%",once:true}});
});
gsap.utils.toArray(".about-image,.contact-card,.review,.review-gallery img").forEach(el=>{
  gsap.from(el,{y:35,opacity:0,duration:.7,ease:"power3.out",
    scrollTrigger:{trigger:el,start:"top 88%",once:true}});
});

const heroSlider=document.querySelector(".hero-slider");
if(heroSlider){
  gsap.to(heroSlider,{y:35,ease:"none",
    scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
}

/* Carrossel: automático a cada 3 segundos, como no site original */
const slides=[...document.querySelectorAll(".slide")];
const dots=[...document.querySelectorAll(".dot")];
const prev=document.querySelector(".slider-arrow.prev");
const next=document.querySelector(".slider-arrow.next");
let current=0;
let timer;

function showSlide(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle("active",i===current));
  dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
function restartAuto(){
  clearInterval(timer);
  timer=setInterval(()=>showSlide(current+1),3000);
}
if(slides.length){
  prev?.addEventListener("click",()=>{showSlide(current-1);restartAuto()});
  next?.addEventListener("click",()=>{showSlide(current+1);restartAuto()});
  dots.forEach((dot,i)=>dot.addEventListener("click",()=>{showSlide(i);restartAuto()}));
  heroSlider?.addEventListener("mouseenter",()=>clearInterval(timer));
  heroSlider?.addEventListener("mouseleave",restartAuto);
  restartAuto();
}
