(function () {
    'use strict';
    console.log('reading js');

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
    // Set character names dynamically in chat boxes
    const chatLeftName = document.querySelector('#chat-left-name');
    const chatRightName = document.querySelector('#chat-right-name');
    // audio
    const themeSong = document.getElementById('theme-song');
    const punchSound = document.getElementById('punch-sound');

    chatLeftName.textContent = player;
    chatRightName.textContent = opponent;

    let restartBtn;

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
                "Wolfe: Hah! Weakling! That was <span class='highlight'>nothing!</span>",
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
        themeSong.volume = 0.5;
        themeSong.play();
        initializeBattle();
    });

    // Attack functionality
    attackBtn.addEventListener('click', function () {
        handleAttack(player, opponent); // Player attacks first
    
        if (gameData.health[opponent] > 0) {
            attackBtn.classList.add('hidden'); // Hide the button during the opponent's turn
            setTimeout(() => {
                handleAttack(opponent, player); // Opponent attacks
                if (gameData.health[player] > 0) {
                    attackBtn.classList.remove('hidden'); // Show the button again for player's turn
                }
            }, 1000); // Ensure enough time for the animation
        }
    });

    function initializeBattle() {
        messages.innerHTML = `<p>${player} attacks first! Click the attack button to start the battle!</p>`;
        startBtn.classList.add('hidden');
        attackBtn.classList.remove('hidden');
        chatLeft.classList.remove('hidden');
        chatRight.classList.remove('hidden');
    }

    // Handle attack
    function handleAttack(attacker, defender) {
        const attackPowerIndex = Math.floor(Math.random() * gameData.attack.length);
        const attackMessage = gameData.attackMessage[attackPowerIndex];
        const attackPower = gameData.attack[attackPowerIndex];

        // Play punch sound
        punchSound.volume = 1.0; // Adjust volume as needed
        punchSound.currentTime = 0; // Reset to the start
        punchSound.play();
    
        // Update health
        gameData.health[defender] -= attackPower;
        if (gameData.health[defender] < 0) gameData.health[defender] = 0;
    
        // Get the defender's character element
        const defenderElement = defender === player 
            ? document.querySelector('.character-left') 
            : document.querySelector('.character-right');
    
        // Trigger the shake animation
        defenderElement.classList.add('shake');
        setTimeout(() => defenderElement.classList.remove('shake'), 500);
    
        // Update health bars and display
        updateHealthBars(defender);
        updateHealthDisplays();
    
        // Show dialogue
        showDialogue(defender);
    
        // Display attack message
        messages.innerHTML += `<p><strong>${attacker}</strong> attacks <strong>${defender}</strong> with ${attackMessage}.</p>`;
    
        // Check if the defender is defeated
        if (gameData.health[defender] === 0) {
            displayWinLoseMessages(attacker, defender);
            attackBtn.classList.add('hidden'); // Hide attack button
            showRestartButton(); // Show the restart button after the game ends
        }
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

    // Update health bars after each attack
    function updateHealthBars(character) {
        const healthBar = character === player ? healthbarLeft : healthbarRight;
        healthBar.style.width = `${gameData.health[character]}%`;
    }

    // Update health display for both players
    function updateHealthDisplays() {
        healthDisplayLeft.textContent = gameData.health[player];
        healthDisplayRight.textContent = gameData.health[opponent];
    }

    // Show restart button after the game ends
    function showRestartButton() {
        restartBtn = document.createElement('button');
        restartBtn.id = 'restart';
        restartBtn.textContent = 'Restart Game';
        restartBtn.addEventListener('click', restartGame);
        document.body.appendChild(restartBtn);
    }

    // Show restart button after the game ends
    function showRestartButton() {
        const restartBtn = document.createElement('button');
        restartBtn.id = 'restart'; // apply the styles from your CSS
        restartBtn.textContent = 'Battle Again!'; // Set the button text
        restartBtn.addEventListener('click', function () {
            location.reload(); // Reload the page on click
        });
        const actionContainer = document.getElementById('action');
        actionContainer.appendChild(restartBtn);
    }    
})();
