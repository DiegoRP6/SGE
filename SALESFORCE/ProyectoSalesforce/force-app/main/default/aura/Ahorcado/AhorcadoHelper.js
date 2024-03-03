({
    initializeGame: function(component) {
        var word = component.get("v.word");
        if (!word) {
            var action = component.get("c.generateRandomWord");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var randomWord = response.getReturnValue();
                    component.set("v.word", randomWord);
                    component.set("v.hiddenWord", this.hideWord(randomWord));
                } else {
                    console.error("Error al generar una palabra aleatoria: " + state);
                }
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.hiddenWord", this.hideWord(word));
        }
    },

    hideWord: function(word) {
        return Array(word.length).fill('_').join('');
    },

    revealLetters: function(word, guessedLetter, hiddenWord) {
        var wordLetters = word.split('');
        var hiddenLetters = hiddenWord.split('');
        var revealedWord = '';

        for (var i = 0; i < word.length; i++) {
            if (wordLetters[i] === guessedLetter) {
                hiddenLetters[i] = guessedLetter;
            }
            revealedWord += hiddenLetters[i];
        }
        return revealedWord;
    },

    isWordGuessed: function(word, hiddenWord) {
        return !hiddenWord.includes('_');
    },

    checkLetter: function(component, guessedLetter) {
        var word = component.get("v.word");
        var hiddenWord = component.get("v.hiddenWord");
        var failures = component.get("v.fails") || 0; 
        if (hiddenWord.includes(guessedLetter)) {
            alert("¡La letra " + guessedLetter + " ya ha sido adivinada anteriormente!");
            return;
        }
    
        var newHiddenWord = this.revealLetters(word, guessedLetter, hiddenWord);
        component.set("v.hiddenWord", newHiddenWord);
    
        if (word.includes(guessedLetter)) {
            if (this.isWordGuessed(word, newHiddenWord)) {
                component.set("v.victory", true);
            }
        } else {
            failures++;
            component.set("v.fails", failures);
    
            alert("¡La letra " + guessedLetter + " no está en la palabra!");
        }

        if (failures === 5) {
            component.set("v.gameOver", true);
        }
    }
    
})
