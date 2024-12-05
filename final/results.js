(function () {
    'use strict';

    console.log('Results page loaded.');

    // Helper function to get query parameters
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Set up the results page
    function setupResultsPage() {
        const outcome = getQueryParameter('outcome'); // 'win' or 'lose'
        const opponentName = getQueryParameter('opponent') || "Unknown Opponent"; // Fallback if not provided
        const resultBackground = document.getElementById('result-background');
        const resultMessage = document.getElementById('result-message');
        const resultCharacter = document.getElementById('result-character');
        const resultTape = document.getElementById('result-tape');
        const retryText = document.getElementById('retry-text');
        const opponentNameElement = document.getElementById('opponent-name'); // Make sure this element exists in HTML

        // Configure the page based on the outcome
        if (outcome === 'win') {
            resultBackground.src = 'images/bg-win.png';
            resultMessage.src = 'images/youwin.png';
            resultCharacter.src = 'images/leon-win.png';
            resultTape.src = 'images/tape-yellow.png';
        } else if (outcome === 'lose') {
            resultBackground.src = 'images/bg-lose.png';
            resultMessage.src = 'images/youlose.png';
            resultCharacter.src = 'images/leon-lose.png';
            resultTape.src = 'images/tape-red.png';
        }

        // Set the opponent name dynamically
        if (opponentNameElement) {
            opponentNameElement.textContent = opponentName;
        }

        // Add event listener for retry text
        retryText.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to battle screen
        });
    }

    // Initialize the results page
    document.addEventListener('DOMContentLoaded', setupResultsPage);
})();