// Get the slideshow container
const slideshow = document.querySelector('[data-component="slideshow"]');

// Get all the slides
const slides = document.querySelectorAll('.slider img');

// Initialize variables
let index = 0;
const time = 5000; // 5 seconds

// Function to show the current slide
function showSlide(n) {
    // Remove active class from all slides
    slides.forEach(slide => slide.style.display = 'none');
    
    // Show the current slide
    slides[n].style.display = 'block';
    
    // Update the active nav dot
    const navDots = document.querySelectorAll('.slider-nav a');
    navDots.forEach((dot, i) => {
        dot.style.backgroundColor = i === n ? '#C71585' : '#fff';
    });
}

// Function to move to the next slide
function nextSlide() {
    index++;
    if (index >= slides.length) index = 0;
    showSlide(index);
}

// Start the slideshow
showSlide(index);
setInterval(nextSlide, time);

// Add click event listeners to the nav dots
const navDots = document.querySelectorAll('.slider-nav a');
navDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        index = i;
        showSlide(index);
    });
});



// Color Thief functionality
const colorThief = new ColorThief();

// Function to update form border color based on the dominant color of the current image
function updateFormBorderColor() {
    const currentImage = slides[index];
    
    // Ensure the image is loaded before getting its color
    if (currentImage.complete) {
        const dominantColor = colorThief.getColor(currentImage);
        const formBorder = document.querySelector('.formBorder');
        formBorder.style.borderColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
    } else {
        currentImage.addEventListener('load', function() {
            const dominantColor = colorThief.getColor(this);
            const formBorder = document.querySelector('.formBorder');
            formBorder.style.borderColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        });
    }
}

// Update form border color when the slide changes
showSlide = (function(original) {
    return function(n) {
        original.apply(this, arguments);
        updateFormBorderColor();
    };
})(showSlide);

// Initial call to set the form border color
updateFormBorderColor();