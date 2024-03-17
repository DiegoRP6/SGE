({
    seleccionarTecla: function(component, event, helper) {
        var label = event.getSource().get("v.label");

        console.log('Label: ' + label);

        var teclaEvent = $A.get("e.c:TeclaPulsada");
        teclaEvent.setParams({ "tecla": label });
        
        teclaEvent.fire();
    }
})