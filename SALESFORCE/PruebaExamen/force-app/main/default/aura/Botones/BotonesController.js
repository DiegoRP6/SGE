({
    handleNotaCambiada : function(component, event, helper) {
        var nuevaNota = event.getParam("nota");
        component.set("v.notaSeleccionada", nuevaNota);
    },

    grabarNota : function(component, event, helper) {
        // Deshabilitar el botón de grabar
        component.find("grabarBtn").set("v.disabled", true);
        // Habilitar el botón de detener
        component.find("stopBtn").set("v.disabled", false);
        // Indicar que estamos grabando
        component.set("v.grabando", true);
        // Llamar a la función para agregar notas
        helper.agregarNota(component);
    },

    detenerGrabacion : function(component, event, helper) {
        // Habilitar el botón de grabar
        component.find("grabarBtn").set("v.disabled", false);
        // Deshabilitar el botón de detener
        component.find("stopBtn").set("v.disabled", true);
        // Indicar que hemos detenido la grabación
        component.set("v.grabando", false);
    }
})

