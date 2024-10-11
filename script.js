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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function handleCircleClick(circle, index) {
    // Reset scale for all circles
    circles.forEach(c => {
        c.classList.remove('active');
        c.style.transform = 'scale(0.5)';
    });

    // Add 'active' class to clicked circle
    circle.classList.add('active');

    // Show modal if circle 3 is clicked
    if (circle.id === 'circle3') {
        const playText = circle.querySelector('.circle-text');
        playText.addEventListener('click', () => {
            playModal.style.display = 'block'; // Show modal
        });
    }

    // Background image change with fading effect
    const backgroundImage = circle.getAttribute('data-background');

    // Step 1: Fade the screen to black
    document.body.classList.add('fade-to-black'); // Apply fade to black class
    
    setTimeout(function() {
        // Step 2: Change the background image after the black fade
        document.body.style.backgroundImage = `radial-gradient(circle, rgba(151, 151, 151, 0), rgba(32, 32, 32, 1) 60% 80%), url('${backgroundImage}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
        // Step 3: Fade the screen back to the new background image
        document.body.classList.remove('fade-to-black');
    }, 1000); // Wait for 1 second (matching the fade-out duration)

    // Center the clicked circle
    const circleRect = circle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const circleCenterX = circleRect.left + circleRect.width / 2;
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const offsetX = containerCenterX - circleCenterX;
    container.style.transition = 'transform 0.8s ease-in-out'; // Smooth transition
    container.style.transform = `translateX(${offsetX}px)`;

    // Gradually scale other circles
    const activeScale = 2;
    circles.forEach((otherCircle, otherIndex) => {
        if (otherCircle !== circle) {
            const distance = Math.abs(index - otherIndex);
            let scale = 1 - 0.2 * distance;
            if (scale < 0.5) scale = 0.4;
            otherCircle.style.transform = `scale(${1})`;
        } else {
            otherCircle.style.transform = `scale(${activeScale})`;
        }
    });
}

// Adding event listeners for circles
circles.forEach((circle, index) => {
    circle.addEventListener('click', (e) => {
        handleCircleClick(circle, index);
    });
});


window.addEventListener('load', () => {
    const thirdCircle = circles[2];
    handleCircleClick(thirdCircle, 2);
});

closeModalBtn.addEventListener('click', () => {
    playModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === playModal) {
        playModal.style.display = 'none';
    }
});

function toggleSwitch(selectedSwitch, otherSwitch) {

    selectedSwitch.setAttribute('data-state', 'on');
    selectedSwitch.style.backgroundColor = '#FBCC0A';

    otherSwitch.setAttribute('data-state', 'off');
    otherSwitch.style.backgroundColor = '#383838';
}

switch1.addEventListener('click', () => toggleSwitch(switch1, switch2));
switch2.addEventListener('click', () => toggleSwitch(switch2, switch1));

document.getElementById('menu-icon').addEventListener('click', function() {
    const content = document.getElementById('menu-content');
    if (content.style.display === 'block') {
        content.style.display = 'none'; // Hide content
    } else {
        content.style.display = 'block'; // Show content
    }
});

const sms = document.querySelector('.messanger');
const sms_icon = document.querySelector('.messanger-icon')

sms_icon.addEventListener('click', function() {
    sms.classList.toggle('active');
    sms_icon.classList.toggle('active');
});

const menu = document.querySelector('.menu-icon');

menu.addEventListener('click', () =>{
    menu.classList.toggle('active');
});

const chat_messanger_user = document.querySelector('.chat-border');
const chat_messanger_user_close_btn = document.querySelector('.chat-close-btn');
const chat_messanger_user_channel = document.querySelector('.sms');
const profile_messanger = document.querySelector('.profile');

chat_messanger_user_close_btn.addEventListener('click', function(){
    chat_messanger_user.style.display ='none';
});

profile_messanger.addEventListener('click', function(){
    chat_messanger_user.style.display ='flex';
});

document.querySelector('.chat-topic').addEventListener('click', function(){
    chat_messanger_user.classList.toggle('active');
});

function sendMessage() {
    // Get the input value
    var messageText = document.getElementById('textInput').value;

    if (messageText.trim() !== "") {
        // Create a new div for the message
        var newMessage = document.createElement('div');
        newMessage.classList.add('chat-message-user'); // Add message class for styling
        newMessage.textContent = messageText;

        // Append the new message to the chat-message container
        document.getElementById('chatMessages').appendChild(newMessage);

        // Clear the input field after sending the message
        document.getElementById('textInput').value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }
}

document.getElementById('textInput').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or default behavior
        sendMessage(); // Call the sendMessage function
    }
});