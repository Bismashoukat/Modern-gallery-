const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lbFilter = document.getElementById("lbFilter");
const zoomRange = document.getElementById("zoomRange");

let images = Array.from(document.querySelectorAll(".card img"));
let index = 0;

// Open lightbox
gallery.addEventListener("click", (e)=>{
  if(e.target.tagName === "IMG"){
    index = images.indexOf(e.target);
    openLightbox(e.target.src);
  }
});

function openLightbox(src){
  lightbox.style.display = "flex";
  lightboxImg.src = src;
  lightboxImg.style.transform = "scale(1)";
  lightboxImg.style.filter = "none";
  zoomRange.value = 100;
  lbFilter.value = "none";
}

// Close lightbox
document.getElementById("closeBtn").onclick = () => lightbox.style.display = "none";

// Next / Prev buttons
document.getElementById("nextBtn").onclick = () => {
  index = (index + 1) % images.length;
  lightboxImg.src = images[index].src;
};
document.getElementById("prevBtn").onclick = () => {
  index = (index - 1 + images.length) % images.length;
  lightboxImg.src = images[index].src;
};

// Keyboard navigation
window.addEventListener("keydown",(e)=>{
  if(lightbox.style.display === "flex"){
    if(e.key === "ArrowRight") document.getElementById("nextBtn").click();
    if(e.key === "ArrowLeft") document.getElementById("prevBtn").click();
    if(e.key === "Escape") lightbox.style.display = "none";
  }
});

// Filter images
let pills = document.querySelectorAll(".pill");
pills.forEach(p => {
  p.addEventListener("click", ()=>{
    pills.forEach(x=>x.classList.remove("active"));
    p.classList.add("active");
    let cat = p.dataset.cat;
    document.querySelectorAll(".card").forEach(card=>{
      card.style.display = (cat === "all" || card.dataset.cat === cat) ? "block":"none";
    });
  });
});

// Lightbox filter
lbFilter.addEventListener("change", ()=>{
  let value = lbFilter.value;
  lightboxImg.style.filter = (value==="none") ? "none": value==="grayscale"?"grayscale(100%)": value==="sepia"?"sepia(60%)":"blur(3px)";
});

// Zoom
zoomRange.addEventListener("input", ()=>{
  let scale = zoomRange.value/100;
  lightboxImg.style.transform = `scale(${scale})`;
});
