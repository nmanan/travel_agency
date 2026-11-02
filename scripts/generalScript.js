// Function to handle automatic slides on Home Page

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


// Function to handle previous and next button in carousel inside the cards on Experience page

document.querySelectorAll(".card .carousel").forEach(carousel => {

    const nextButton = carousel.querySelector(".carousel-control-next");
    const prevButton = carousel.querySelector(".carousel-control-prev");

    nextButton.addEventListener("click", () => {
        bootstrap.Carousel.getOrCreateInstance(carousel, {
            interval: false,
            ride: false
        }).next();
    });

    prevButton.addEventListener("click", () => {
        bootstrap.Carousel.getOrCreateInstance(carousel, {
            interval: false,
            ride: false
        }).prev();
    });

});

//-------------------Filter code for Experience page

const filterButtons = document.querySelectorAll("[data-filter]");
const experienceCards = document.querySelectorAll(".experience-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        experienceCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (selectedCategory === "all" || cardCategory === selectedCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});

//-------------------------Selecting bookings

document.querySelectorAll(".selectExperience").forEach(button => {
    button.addEventListener("click", () => {

        button.classList.toggle("selected");

        if (button.classList.contains("selected")) {
            button.textContent = "Selected for booking";
            button.classList.remove("btn-outline-success");
            button.classList.add("btn-success");
        } else {
            button.textContent = "Book";
            button.classList.remove("btn-success");
            button.classList.add("btn-outline-success");
        }

    });
});



//---------------------------- Booking the experiences


// Open the booking modal
const bookingButton = document.querySelector("#selectedBooking");

bookingButton.addEventListener("click", () => {

    // Find all selected experiences
    const selectedButtons = document.querySelectorAll(
        ".selectExperience.selected"
    );

    // Get the booking list element
    const bookingList = document.querySelector("#booking-list");

    // Clear any previous list items
    bookingList.innerHTML = "";

    // Add each selected experience to the list
    selectedButtons.forEach(button => {

        const experienceName = button.dataset.name;

        const listItem = document.createElement("li");
        listItem.textContent = experienceName;

        bookingList.appendChild(listItem);
    });


     //Calculate total price

        const peopleInput = document.querySelector("#booking-people");
        const totalDisplay = document.querySelector("#booking-total");

        function calculateTotal() {

            const numberOfPeople = Number(peopleInput.value);

            let total = 0;

            selectedButtons.forEach(button => {
                const experiencePrice = Number(button.dataset.price);

                total += experiencePrice * numberOfPeople;
            });

            totalDisplay.textContent = total;
        }

        // Calculate the total when the modal opens
        calculateTotal();

        // Recalculate when the number of people changes
        peopleInput.addEventListener("input", calculateTotal);


    // Open the Bootstrap modal
    const bookingModal = new bootstrap.Modal(
        document.querySelector("#bookingModal")
    );

    bookingModal.show();

});


//------------ Confirmation of booking ----------------
const proceedButton = document.querySelector("#proceed-booking");

proceedButton.addEventListener("click", () => {

    const confirmationMessage = document.querySelector("#booking-confirmation");

    const selectedButtons   = document.querySelectorAll (
        ".selectExperience.selected"
    );

    const bookingDate = document.querySelector ("#booking-date");
    const numberPeople = document.querySelector ("#booking-people");
    const emailInput = document.querySelector("#booking-email");


    if(selectedButtons.length  === 0){
        alert("Please select at least one experience.");
        return;
    }

    if (bookingDate.value === ""){
        alert("Please select a booking date.");
        return;
    }

    if (emailInput.value.trim() === "") {
        alert("Please enter your email address.");
        return;
    }

    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    const confirmedExperiences = document.querySelector("#confirmed-experiences");

    confirmedExperiences.innerHTML = "";


    selectedButtons.forEach(button => {

            const listItem = document.createElement ("li");
            listItem.textContent = button.dataset.name;
            confirmedExperiences.appendChild(listItem);
    });

    document.querySelector("#confirmed-date").textContent = bookingDate.value;

    document.querySelector("#confirmed-people").textContent = numberPeople.value;

    document.querySelector("#confirmed-total").textContent = document.querySelector("#booking-total").textContent;

    document.querySelector("#confirmed-email").textContent = emailInput.value;

    confirmationMessage.classList.remove("d-none");
});