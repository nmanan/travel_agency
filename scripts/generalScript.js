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

const bookingButton = document.querySelector("#selectedBooking");

if(bookingButton){

    bookingButton.addEventListener("click", () => {

        const selectedButtons = document.querySelectorAll(
            ".selectExperience.selected"
        );

        const bookingList = document.querySelector("#booking-list");

        bookingList.innerHTML = "";

        selectedButtons.forEach(button => {

            const experienceName = button.dataset.name;

            const listItem = document.createElement("li");
            listItem.textContent = experienceName;

            bookingList.appendChild(listItem);
        });


         //Calculate price

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

            calculateTotal();

            peopleInput.addEventListener("input", calculateTotal);

        const bookingModal = new bootstrap.Modal(
            document.querySelector("#bookingModal")
        );

        bookingModal.show();

    });
}

//------------ Confirmation of booking ----------------
const proceedButton = document.querySelector("#proceed-booking");

if(proceedButton){

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
}



/**************************************************************/

// CONTACT FORM VALIDATION

function showError(id, text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).style.color = "red";
}

function checkForm(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let enquiryType = document.getElementById("enquiryType").value;
    let message = document.getElementById("message").value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    let isValid = true;

    showError("nameError", "");
    showError("emailError", "");
    showError("phoneError", "");
    showError("enquiryTypeError", "");
    showError("messageError", "");

    if (name === "") {
        showError("nameError", "Please enter your name.");
        isValid = false;
    }

    if (email === "") {
        showError("emailError", "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (phone === "") {
        showError("phoneError", "Please enter your phone number.");
        isValid = false;
    }

    if (enquiryType === "") {
        showError("enquiryTypeError", "Please select an enquiry type.");
        isValid = false;
    }

    if (message === "") {
        showError("messageError", "Please enter your message.");
        isValid = false;
    } 

    
    // Display confirmation if all fields are correct
    if (isValid) {

        let previousBooking = document.getElementById("previousBooking").checked;

        document.getElementById("enquiryForm").style.display = "none";
        document.getElementById("contactIntroduction").style.display = "none";

        document.getElementById("confirmation").innerHTML =
            "Thank you, " + name + "! Your enquiry has been successfully submitted.";

        if (previousBooking) {
            document.getElementById("confirmation").innerHTML +=
                "<br>Thank you for letting us know that you have already booked with us.";
        }
    }
}
