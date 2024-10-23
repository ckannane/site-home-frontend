
document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app'); // Target the container where HTML will be injected

    // Login Form HTML in JavaScript (Initial state)
    const loginForm = `
        <div class="login">
            <img src="src/pingpong-logo.png" class="logo-log">
            <div class="log-contain">
                <form action="/log.html" method="post">
                    <input type="text" id="fname" name="fname" placeholder="Username">
                    <input type="password" id="pwd" name="pwd" placeholder="Password">
                    <button type="submit" class="connect-button">Connect</button>
                    <div class="stay-sign">
                        <input type="checkbox" id="stay-sign" name="stay-sign" value="stay-signed-in">
                        <label for="stay-sign"> Stay Signed-in</label>
                    </div>
                    <div class="line"></div>
                </form>
                <div class="Sign-in">
                    <div class="message">Not registered yet?</div>
                    <div class="Sign-in-button" id="open-register">Sign-in</div> <!-- Button to open registration form -->
                </div>
                <div class="button-logs">
                    <button class="btn1" type="button"></button>
                    <button class="btn2" type="button"></button>
                    <button class="btn3" type="button"></button>
                </div>
            </div>
        </div>
    `;

    // Registration Form HTML in JavaScript (Hidden initially)
    const registerForm = `
    <div class="registing" style="background-color: rgba(72, 95, 125, 0.6);">
        <img src="src/pingpong-logo.png" class="logo-log" style="margin: 10px;">
        <div class="registing">
            <div class="message">Enterning the requirts for your regist:</div>
            <form action="/submit_registration" method="post">
                <input type="text_reg" id="username" name="username" placeholder="Username">
                <input type="text_reg" id="first-name" name="first-name" placeholder="First Name">
                <input type="text_reg" id="last-name" name="last-name" placeholder="Last Name">
                <input type="email_reg" id="email" name="email" placeholder="Email">
                <input type="password" id="password" name="password" placeholder="Password">
                <button type="submit" class="submit-button" id="submit_status">Submit</button>
            </form>            
            <div class="message" style="color: #fff;">You can also create an account with</div>
            <div class="button-logs">
                <button class="btn1" type="button"></button>
                <button class="btn2" type="button"></button>
                <button class="btn3" type="button"></button>
            </div>
            <div class="close-register" id="close-register">Back to Login</div>
        </div>
        <div id="success-modal" class="modal hidden">
    <div class="modal-content">
        <span class="close-modal" id="close-modal">&times;</span>
        <p>You have successfully registered!</p>
    </div>
</div>
        </div>
    `;

    // Initially load the login form
    app.innerHTML = loginForm;

    // Add event listener to switch between forms
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'open-register') {
            app.innerHTML = registerForm; // Inject the registration form HTML
        }

        if (event.target && event.target.id === 'close-register') {
            app.innerHTML = loginForm; // Inject the login form HTML
        }
    });
});


const circles = document.querySelectorAll('.circle');
const container = document.querySelector('.circle-container');
const playModal = document.getElementById('play-modal'); // Get the modal element
const closeModalBtn = document.querySelector('.close-btn'); // Close button inside modal
const modeImage = document.getElementById('mode-image'); // Image container for game mode
const modeButtons = document.querySelectorAll('.mode-button'); // All game mode buttons
const buttons = document.querySelectorAll('.mode-button');
const switch1 = document.getElementById('switch-1');
const switch2 = document.getElementById('switch-2');

const success_submit_Modal = document.getElementById('modal-content');

document.querySelectorAll('submit-button').addEventListener('click', () => {
    success_submit_Modal.style.display = 'block'; // Show modal
});
// Function to handle circle click event





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
};

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
const profile_messanger = document.querySelector('.friend-profile');

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



const avatarBar = document.querySelectorAll('.pingpong-avatar-bar');
const profilePhoto = document.querySelectorAll('.profile-photo');