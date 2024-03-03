({
    init: function(component, event, helper) {
        helper.initializeGame(component);
    },

    guessLetter: function(component, event, helper) {
        var guessedLetter = component.get("v.guessedLetter");
        var hiddenWord = component.get("v.hiddenWord");
        var word = component.get("v.word");
        


        if (!guessedLetter || !hiddenWord) {
            console.error("La letra o la palabra oculta no están definidas.");
            return;
        }

        helper.checkLetter(component, guessedLetter);
    },
    validateInput : function(component, event, helper) {
        var inputCmp = component.find("guessedLetter");
        var value = inputCmp.get("v.value");
    
        // Verificar si la entrada está vacía o nula
        if (value == null || value === "") {
            return; // No hacer nada si la entrada está vacía
        }
    
        if (!value.match(/[A-Z]/)) {
            alert("Por favor, introduce una letra MAYÚSCULA válida.");
            inputCmp.set("v.value", null); 
        }
    },
    

})
