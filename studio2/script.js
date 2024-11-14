"use strict";
console.log("reading JS");

const images = document.querySelectorAll('.image');
const overlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalImage = document.querySelector('.modal-image');
const modalDescription = document.querySelector('.modal-description');
const closeModalButton = document.querySelector('.close-modal');

// array of descriptions for each image
const descriptions = [
    {   // content for the first image
        title: "“Why's everyone smiling?”",
        text: "Rocky's first meeting with his new family. They keep smiling and pointing these strange, shiny things at him. They were so excited so it must be a good thing he thought. He did his best to look extra cute (not hard for him at all!)"
    },
    {   // content for the second image
        title: "“What's so funny, human?”",
        text: "Rocky was sleeping peacefully, however a giggly human snapping a picture of him woke him up. He's used to it (it's still his first day at his new owner's home)."
    },
    {   // content for the third image
        title: "“Contemplating Life's Mysteries”",
        text: "A quiet day by the pool where Rocky ponders life, beauty, and everything in between (whispers: he doesn't like to swim!)"
    },
    {   // content for the fourth image
        title: "“Oh uh...ahem- um...”",
        text: "Rocky observes the living room from a unique angle. Yeah!"
    },
    {   // content for the fifth image
        title: "“Enemy? Food? What's going on...”",
        text: "Rocky stays still with every fiber of his being waiting for the right moment to strike...or wait, is he being knighted by a unicorn?"
    }
];

// loops through each image
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() { // click event listener to each image
        overlay.style.display = 'block'; // displays the overlay when an image is clicked
        modal.style.display = 'flex';
        modalImage.src = this.src; // sets the clicked image as the source for the modal image
        closeModalButton.style.display = 'block';
        
        // change the modal's element with the title and text from the array
        modalDescription.querySelector('h2').innerText = descriptions[i].title;
        modalDescription.querySelector('p').innerText = descriptions[i].text;
    });
}

// click event listener to the overlay to close the modal when clicked
overlay.addEventListener('click', closeModal);

// to close the modal
function closeModal() {
    // Hides the overlay, modal, and tap to close button
    overlay.style.display = 'none';
    modal.style.display = 'none';
    closeModalButton.style.display = 'none';
}