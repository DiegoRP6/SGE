({
    seleccionarNota : function(component, event, helper) {
        // Obtener la etiqueta del botón que se ha hecho clic
        var label = event.getSource().get("v.label");

        // Mostrar la etiqueta en la consola del navegador
        console.log('Label: ' + label);

        // Crear un evento personalizado y establecer los parámetros
        var notaEvent = $A.get("e.c:notaCambiadaEvent");
        notaEvent.setParams({
            "nota": label
        });

        // Lanzar el evento
        notaEvent.fire();
    }
})