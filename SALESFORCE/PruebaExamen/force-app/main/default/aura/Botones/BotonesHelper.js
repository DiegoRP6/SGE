({
    agregarNota : function(component) {
        var musica = component.get("v.Musica") || '';

        var agregarNota = function() {
            var notaSeleccionada = component.get("v.notaSeleccionada") || ''; // Obtener la nota seleccionada en cada iteración
            if (component.get("v.grabando")) {
                musica += notaSeleccionada;
                component.set("v.Musica", musica);
                setTimeout($A.getCallback(function() {
                    agregarNota();
                }), 1000);
            }
        };
        
        agregarNota();
    }
})
