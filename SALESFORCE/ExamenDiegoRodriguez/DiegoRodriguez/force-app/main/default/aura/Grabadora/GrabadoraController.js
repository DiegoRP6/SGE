({
    onInit: function(component, event, helper) {

        var action = component.get("c.obtenerSecuenciasGuardadasDeBaseDeDatos");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var secuencias = response.getReturnValue();
                component.set("v.SecuenciasGuardadas", secuencias);
                console.log("SecuenciasGuardadas cargadas ");
            } else {
                console.error("Error al cargar SecuenciasGuardadas", response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    handleTeclaPulsada: function(component, event, helper) {
        var nuevaTecla = event.getParam("tecla");
        component.set("v.TeclaSeleccionada", nuevaTecla);
        
        if (component.get("v.GrabacionActiva")) {
            var secuenciaActual = component.get("v.Secuencia");
            secuenciaActual += nuevaTecla;
            component.set("v.Secuencia", secuenciaActual);
        }
    },
    
    iniciarGrabacion: function(component, event, helper) {
        component.set("v.GrabacionActiva", true);
    },

    detenerGrabacion: function(component, event, helper) {
        // Establecer GrabacionActiva en false al detener la grabación
        component.set("v.GrabacionActiva", false);

        // Agregar la secuencia actual a la lista de secuencias
        var secuenciaActual = component.get("v.Secuencia");
        if (secuenciaActual) {
            var secuenciasAnteriores = component.get("v.Secuencias") || [];
            secuenciasAnteriores.push(secuenciaActual);
            component.set("v.Secuencias", secuenciasAnteriores);
        }

        // Reiniciar la secuencia actual
        component.set("v.Secuencia", "");
    },
    reproducirSecuencias: function(component, event, helper) {
        var secuencias = component.get("v.Secuencias");
        if (secuencias && secuencias.length > 0) {
            var index = 0;
            var timer = setInterval(function() {
                console.log("Secuencia " + (index + 1) + ": " + secuencias[index]);
                index++;
                if (index >= secuencias.length) {
                    clearInterval(timer);
                }
            }, 1000);
        } else {
            console.log("No hay secuencias para reproducir.");
        }
    },
    guardarSecuencias: function(component, event, helper) {
        var secuencias = component.get("v.Secuencias");
        
        var action = component.get("c.guardarSecuenciasEnBaseDeDatos");
        action.setParams({ secuencias: secuencias });
        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                console.log("Guardado!");
            } else {
                console.error("Error al guardar");
            }
        
        component.set("v.Secuencias", []);
        });
        $A.enqueueAction(action);
    },
    limpiarSecuencias: function(component, event, helper) {
        var action = component.get("c.limpiarBillingCountryEnBaseDeDatos");

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                console.log("BillingCity borrado con éxito en la base de datos.");
            } else {
                console.error("Error al borrar BillingCity en la base de datos: ", response.getError());
            }
        });
        
        $A.enqueueAction(action);
    }
})