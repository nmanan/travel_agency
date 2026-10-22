const slides = document.querySelectorAll(".slider img");
let currentSlide = 0;

function showNext() {
	slides[currentSlide].classList.remove("active");

	currentSlide= (currentSlide + 1) % slides.length;

	slides[currentSlide].classList.add("active");
}


// First Image
if(slides.length > 0) {
	slides[0].classList.add("active");

	setInterval(showNext, 4000);
}