const circles = document.querySelectorAll('.circle');
const container = document.querySelector('.circle-container');
const playModal = document.getElementById('play-modal'); // Get the modal element
const closeModalBtn = document.querySelector('.close-btn'); // Close button inside modal
const modeImage = document.getElementById('mode-image'); // Image container for game mode
const modeButtons = document.querySelectorAll('.mode-button'); // All game mode buttons
const buttons = document.querySelectorAll('.mode-button');
const switch1 = document.getElementById('switch-1');
const switch2 = document.getElementById('switch-2');
// Function to handle circle click event

function handleCircleClick(circle, index) {
    // Reset scale for all circles
    circles.forEach(c => {
        c.classList.remove('active');
        c.style.transform = 'scale(1)';
    });

    // Add 'active' class to clicked circle
    circle.classList.add('active');

    // Center the clicked circle
    const circleRect = circle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const circleCenterX = circleRect.left + circleRect.width / 2;
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const offsetX = containerCenterX - circleCenterX;
    container.style.transition = 'transform 0.8s ease'; // Smooth transition
    container.style.transform = `translateX(${offsetX}px)`;

    // If "PLAY" circle clicked, show modal
    if (circle.id === 'circle3') {
        const playText = circle.querySelector('.circle-text');
        playText.addEventListener('click', () => {
            playModal.style.display = 'block'; // Show modal
        });
    }

    // Gradually scale other circles
    const activeScale = 2;
    circles.forEach((otherCircle, otherIndex) => {
        if (otherCircle !== circle) {
            const distance = Math.abs(index - otherIndex);
            let scale = 1 - 0.2 * distance;
            if (scale < 0.5) scale = 0.5;
            otherCircle.style.transform = `scale(${scale})`;
        } else {
            otherCircle.style.transform = `scale(${activeScale})`;
        }
    });
}


modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const imageSrc = button.getAttribute('data-image'); // Get the image src from data attribute
        modeImage.src = imageSrc; // Set the new image
        modeImage.style.display = 'block'; // Ensure the image is visible
        modeImage.style.transition = 'transform 0.8s ease';
    });
});

// Add event listeners to all circles
circles.forEach((circle, index) => {
    circle.addEventListener('click', () => handleCircleClick(circle, index));
});

// Automatically trigger click on the third circle on page load
window.addEventListener('load', () => {
    const thirdCircle = circles[2];
    handleCircleClick(thirdCircle, 2);
});

// Close modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    playModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === playModal) {
        playModal.style.display = 'none';
    }
});

function toggleSwitch(selectedSwitch, otherSwitch) {
    // Set the selected switch to "on"
    selectedSwitch.setAttribute('data-state', 'on');
    selectedSwitch.style.backgroundColor = '#FBCC0A'; // Green for "on"

    // Set the other switch to "off"
    otherSwitch.setAttribute('data-state', 'off');
    otherSwitch.style.backgroundColor = '#383838'; // Yellow for "off"
}

// Add event listeners for the switch buttons
switch1.addEventListener('click', () => toggleSwitch(switch1, switch2));
switch2.addEventListener('click', () => toggleSwitch(switch2, switch1));