const pendingListButton = document.getElementById('pending_list');
const blockListButton = document.getElementById('block_list');
const shareProfileButton = document.getElementById('share_profil');
const pendingModal = document.getElementById('pendingModal');
const closeModalButton = document.querySelector('.close_modal');

// Show the modal when the pending list button is clicked
pendingListButton.addEventListener('click', function() {
    pendingModal.style.display = 'flex';
});

closeModalButton.forEach(close=>{
    close.addEventListener('click', function() {
            BlockgModal.style.display = 'none';
            pendingModal.style.display = 'none';
        });
})
// closeModalButton.addEventListener('click', function() {
//     BlockgModal.style.display = 'none';
//     pendingModal.style.display = 'none';
// });


// Optional: Close the modal if the user clicks outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === pendingModal) {
        pendingModal.style.display = 'none';
    }
    if (event.target === BlockgModal) {
        BlockgModal.style.display = 'none';
    }
});

blockListButton.addEventListener('click', function() {
    // Your code for block list handling goes here
    BlockgModal.style.display = 'flex';
});

// Event listener for sharing profile
shareProfileButton.addEventListener('click', function() {
    // Your code for sharing profile goes here
    console.log('Share profile clicked');
});