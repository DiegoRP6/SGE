({
    myAction : function(component, event, helper) {

    },
    manejarEvento : function(component, event, helper) {
        var pointsToAdd = event.getParam("molePoint");
        var marcador = component.get("v.marcador");
        if (pointsToAdd == 0){
            marcador = 0;
        }else{
            marcador += pointsToAdd;
        }
        component.set("v.marcador", marcador);
    }
})