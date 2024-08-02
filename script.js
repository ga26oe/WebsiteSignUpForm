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

// Toggling dark and light mode
    document.addEventListener('DOMContentLoaded', (event) => {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme');
      
        if (currentTheme) {
          document.documentElement.setAttribute('data-theme', currentTheme);
          updateIcon(currentTheme);
        }
      
        themeToggle.addEventListener('click', () => {
          let theme = document.documentElement.getAttribute('data-theme');
          let newTheme = theme === 'light' ? 'dark' : 'light';

      
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          updateIcon(newTheme);
        });
      
        function updateIcon(theme) {
          const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
          const sunPath = "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42";
      
          const svgPath = themeToggle.querySelector('path');
          if (theme === 'dark') {
            svgPath.setAttribute('d', sunPath);
          } else {
            svgPath.setAttribute('d', moonPath);
          }
        }
      });

// Color Thief functionality
const colorThief = new ColorThief();

// Function to update form border color based on the dominant color of the current image
function updateColors() {
    const currentImage = slides[index];
    
    // Ensure the image is loaded before getting its color
    if (currentImage.complete) {
        const dominantColor = colorThief.getColor(currentImage);
        const formBorder = document.querySelector('.formBorder');
        const submitBtn = document.querySelector('.submit-btn');

        formBorder.style.borderColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        formBorder.style.outlineColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.5)`;

        submitBtn.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        githubLink.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
    } else {
        currentImage.addEventListener('load', function() {
            const dominantColor = colorThief.getColor(this);
            const formBorder = document.querySelector('.formBorder');
            const submitBtn = document.querySelector('.submit-btn');

            formBorder.style.borderColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            formBorder.style.outlineColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.5)`;
            submitBtn.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        });
    }
}

// Update form border color when the slide changes
showSlide = (function(original) {
    return function(n) {
        original.apply(this, arguments);
        updateColors();
    };
})(showSlide);

// Initial call to set the form border color
updateColors(); 


// Password validation


const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordRequirements = document.getElementById('passwordRequirments');
const passwordError = document.getElementById('passwordError');

const uppercaseElement = document.getElementById('uppercase');
const specialCharElement = document.getElementById('specialChar');
const lengthElement = document.getElementById('length');

function validatePassword() {
    const password = passwordInput.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    uppercaseElement.classList.toggle('valid', hasUpperCase);
    specialCharElement.classList.toggle('valid', hasSpecialChar);
    lengthElement.classList.toggle('valid', isLongEnough);

    return hasUpperCase && hasSpecialChar && isLongEnough;
}

function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        passwordError.textContent = "Passwords do not match";
        passwordError.classList.remove('hidden');
        return false;
    } else {
        passwordError.classList.add('hidden');
        return true;
    }
}

passwordInput.addEventListener('input', validatePassword);
passwordInput.addEventListener('focus', () => passwordRequirements.classList.remove('hidden'));
passwordInput.addEventListener('blur', () => {
    if (validatePassword()) {
        passwordRequirements.classList.add('hidden');
    }
});

confirmPasswordInput.addEventListener('blur', checkPasswordMatch);

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!validatePassword() || !checkPasswordMatch()) {
        e.preventDefault();
        alert('Please check your password and try again.');
    }
});
