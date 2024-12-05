(function () {
    'use strict';
    console.log('reading js');

    // DOM Elements
    const messages = document.querySelector('#messages');
    const startBtn = document.querySelector('#start');
    const attackBtn = document.querySelector('#attack');
    const healthbarLeft = document.querySelector('#healthbar-left .health-fill');
    const healthbarRight = document.querySelector('#healthbar-right .health-fill');
    const healthDisplayLeft = document.querySelector('.health-display-left');
    const healthDisplayRight = document.querySelector('.health-display-right');
    const chatLeft = document.querySelector('#chat-left');
    const chatRight = document.querySelector('#chat-right');
    const chatLeftDialogue = document.querySelector('#chat-left-dialogue');
    const chatRightDialogue = document.querySelector('#chat-right-dialogue');
    const player = 'Leon';
    const opponent = 'Hensel Twins';
    const themeSong = document.getElementById('theme-song');
    const punchSound = document.getElementById('punch-sound');
    const powerPunchSound = new Audio('sounds/power-punch.mp3'); // Sound for 20 damage

    // Set character names dynamically in chat boxes
    const chatLeftName = document.querySelector('#chat-left-name');
    const chatRightName = document.querySelector('#chat-right-name');
    chatLeftName.textContent = player;
    chatRightName.textContent = opponent;

    // Game data object
    const gameData = {
        health: { [player]: 100, [opponent]: 100 },
        attack: [5, 10, 20],
        attackMessage: [
            'a very weak attack! 5 hit points!',
            'a weak attack for 10 hit points!',
            'a big attack for 20 hit points!'
        ],
        dialogues: {
            [player]: [
                "I swear if Risa is sipping tea right now...",
                "My eye is dry...",
                "That was nothing.",
                "Ugh...do something you useless slime.",
                "Which one's which...",
                `Just give up already, ${opponent}`
            ],
            [opponent]: [
                "Wolfe: Hah! Weakling! That was nothing!",
                "Wolfe: Iven, he hit my face!",
                "Wolfe: Iven, let's finish him off with the next one!",
                "Iven: Is that your best shot?",
                "Iven: This should be easy.",
                `Iven: Nice try, ${player}. Try harder.`
            ]
        },
        winMessages: {
            [player]: `I win. Get lost, ${opponent}!`,
            [opponent]: `Hah, we win! Better luck next time, ${player}!`
        },
        loseMessages: {
            [player]: "Ugh...what am I gonna tell Risa",
            [opponent]: "Ugh...no way we lost to the slime dude."
        }
    };

    // Start the game
    startBtn.addEventListener('click', function () {
        themeSong.volume = 0.3;
        themeSong.play();
        initializeBattle();
    });

    // Attack button functionality
    attackBtn.addEventListener('click', function () {
        handleAttack(player, opponent); // Player attacks first

        if (gameData.health[opponent] > 0) {
            attackBtn.classList.add('hidden'); // Hide the button during the opponent's turn
            setTimeout(() => {
                handleAttack(opponent, player); // Opponent attacks
                if (gameData.health[player] > 0) {
                    attackBtn.classList.remove('hidden'); // Show the button again for the player's turn
                }
            }, 1000); // Delay for animation timing
        }
    });

    // Initialize battle setup
    function initializeBattle() {
        messages.innerHTML = `<p>${player} attacks first! Click the attack button to start the battle!</p>`;
        startBtn.classList.add('hidden');
        attackBtn.classList.remove('hidden');
        chatLeft.classList.remove('hidden');
        chatRight.classList.remove('hidden');
    }

    // Handle an attack from one character to another
    function handleAttack(attacker, defender) {
        const attackPowerIndex = Math.floor(Math.random() * gameData.attack.length);
        const attackMessage = gameData.attackMessage[attackPowerIndex];
        const attackPower = gameData.attack[attackPowerIndex];
    
        if (attacker === player && attackPower === 20) {
            console.log(`Player dealt ${attackPower} damage. Showing overlay.`);
            showAttackOverlay(); // Trigger overlay animation
            powerPunchSound.volume = 1.0;
            powerPunchSound.currentTime = 0; // Reset sound
            powerPunchSound.play(); // Play special punch sound
    
            setTimeout(() => {
                updateHealthAndDisplay(attacker, defender, attackMessage, attackPower);
                showDamageText(defender, attackPower); // Show damage text
            }, 2000); // Delay for overlay animation
        } else {
            updateHealthAndDisplay(attacker, defender, attackMessage, attackPower);
            showDamageText(defender, attackPower); // Show damage text
            punchSound.volume = 1.0; // Adjust volume as needed
            punchSound.currentTime = 0; // Reset to the start
            punchSound.play();
        }
    }    

    // Show attack overlay with slide-in animation
    function showAttackOverlay() {
        const overlay = document.getElementById('attack-overlay');
        const overlayImage = overlay.querySelector('.overlay-image');

        if (!overlay || !overlayImage) {
            console.error('Overlay or overlay image not found');
            return;
        }

        console.log('Attack overlay triggered');

        // Reset and trigger animation
        overlayImage.style.animation = 'none';
        void overlayImage.offsetWidth; // Trigger reflow to reset animation

        // Apply slide-in and slide-out animation
        overlayImage.style.animation = 'slide-center-fade 2.5s ease-in-out forwards';
        
        // Show overlay
        overlay.classList.add('show');

        // Hide the overlay after the animation
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 3000); // Match animation duration
    }

    // Update health bars and display messages
    function updateHealthAndDisplay(attacker, defender, attackMessage, attackPower) {
        gameData.health[defender] -= attackPower;
        if (gameData.health[defender] < 0) gameData.health[defender] = 0;

        updateHealthBars(defender);
        updateHealthDisplays();

        const defenderElement = defender === player
            ? document.querySelector('.character-left')
            : document.querySelector('.character-right');

        // Shake animation for defender
        defenderElement.classList.add('shake');
        setTimeout(() => defenderElement.classList.remove('shake'), 500);

        showDialogue(defender);
        messages.innerHTML += `<p><strong>${attacker}</strong> attacks <strong>${defender}</strong> with ${attackMessage}.</p>`;

        // Check for game end
        if (gameData.health[defender] === 0) {
            displayWinLoseMessages(attacker, defender);
            attackBtn.classList.add('hidden'); // Hide attack button
            redirectToResultsPage(attacker, defender);
        }
    }

    // Update health bar widths
    function updateHealthBars(character) {
        const healthBar = character === player ? healthbarLeft : healthbarRight;
        healthBar.style.width = `${gameData.health[character]}%`;
    }

    // Update health display for both players
    function updateHealthDisplays() {
        healthDisplayLeft.textContent = gameData.health[player];
        healthDisplayRight.textContent = gameData.health[opponent];
    }

    // Create and display damage text
    function showDamageText(defender, damage) {
        const healthbar = defender === player ? healthbarLeft : healthbarRight;
        const damageText = document.createElement('div');
        damageText.textContent = `-${damage}`;
        damageText.classList.add('damage-text');
        
        // Position the text dynamically above the health bar
        healthbar.appendChild(damageText);
        damageText.style.left = `${Math.random() * 50 + 25}%`; // Randomize x position slightly
        damageText.style.top = '25px';

        // Remove the text after animation
        setTimeout(() => {
            damageText.remove();
        }, 1500);
    }

    // Redirect to results page with outcome
    function redirectToResultsPage(winner, loser) {
        const outcome = winner === player ? 'win' : 'lose';
        const opponentParam = encodeURIComponent(opponent); // Encode opponent name for safe URL usage
        setTimeout(() => {
            window.location.href = `results.html?outcome=${outcome}&opponent=${opponentParam}`; // Redirect with outcome and opponent
        }, 1000); // Delay the redirect by 1 second
    }
    

    // Show random dialogue in the chat box
    function showDialogue(character) {
        const dialogue = gameData.dialogues[character];
        const randomDialogue = dialogue[Math.floor(Math.random() * dialogue.length)];

        if (character === player) {
            chatLeftDialogue.textContent = randomDialogue;
        } else {
            chatRightDialogue.textContent = randomDialogue;
        }
    }

    function showDialogue(character) {
        const dialogue = gameData.dialogues[character];
        const randomDialogue = dialogue[Math.floor(Math.random() * dialogue.length)];
    
        // Define words to emphasize (these can be customized)
        const wordsToEmphasize = ['weakling', 'face', 'slime', 'try harder', 'easy', 'slime dude'];
    
        // Function to wrap words in a span with the scale-emphasis class
        function emphasizeWords(dialogue) {
            let emphasizedDialogue = dialogue;
            wordsToEmphasize.forEach(word => {
                const regex = new RegExp(`(${word})`, 'gi'); // Case-insensitive match
                emphasizedDialogue = emphasizedDialogue.replace(regex, '<span class="scale-emphasis">$1</span>');
            });
            return emphasizedDialogue;
        }
    
        const dialogueWithEmphasis = emphasizeWords(randomDialogue);
    
        if (character === player) {
            chatLeftDialogue.innerHTML = dialogueWithEmphasis; // Use innerHTML to allow HTML tags
        } else {
            chatRightDialogue.innerHTML = dialogueWithEmphasis;
        }
    }        

    // Display win and lose messages in chat boxes
    function displayWinLoseMessages(winner, loser) {
        const winnerMessage = gameData.winMessages[winner];
        const loserMessage = gameData.loseMessages[loser];

        if (winner === player) {
            chatLeftDialogue.textContent = winnerMessage;
            chatRightDialogue.textContent = loserMessage;
        } else {
            chatLeftDialogue.textContent = loserMessage;
            chatRightDialogue.textContent = winnerMessage;
        }
    }
})();