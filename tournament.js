document.addEventListener("DOMContentLoaded", () => {
    const playersInQueueContainer = document.querySelector(".player_in_queue");
    const blocks_queue = 12; // Set the total number of players

    // Dynamically create player elements
    for (let i = 1; i <= blocks_queue; i++) {
        const playerSpan = document.createElement("span");
        playerSpan.classList.add("players_in");
        playersInQueueContainer.appendChild(playerSpan); // Append to container
    }

    const playersInQueue = document.querySelectorAll(".players_in");
    let index = 0; // Start index at 0

    // Set up an interval that repeats every 200ms
    setInterval(() => {
        // Remove the active class from all elements if we reach the end of the sequence
        if (index === playersInQueue.length) {
            playersInQueue.forEach(player => player.classList.remove("active"));
            index = 0; // Reset index to start over
        }

        // Add active class to the current element
        playersInQueue[index].classList.add("active");
        index++; // Move to the next element for the next interval
    }, 200); // Repeat every 0.2 seconds
});
