
({
    doInit: function(cmp) {  //cmp = componente
        var topo = cmp.find("topo");
        
        //SEGUNDA FORMA
        //Math.random() < 0.5 ? $A.util.addClass(topo, 'active') : $A.util.addClass(topo, 'inactive') ;
        var randomNumberGenerator = component.get("c.random")

        randomNumberGenerator.setcallback(this, function(response){ //Copilot se suele olvidar el this
        
            var estadoDeLaPeticion = response.getState();
            if(estadoDeLaPeticion === "SUCCESS"){
                var aleatorio = response.getReturnValue();
                if(aleatorio < 0.5){
                    $A.util.addClass(topo, 'active');
                    cmp.set("v.isTopo", true)
                }else{ 
                    $A.util.addClass(topo, 'inactive');  
                    cmp.set("v.isTopo", false)
                }
            }else{
                console.log("Failed with state: " + estadoDeLaPeticion);
            }
        
        });
        $A.enqueueAction(randomNumberGenerator);
    },

    topoClick: function(cmp, event, helper) {
        var isTopo = cmp.get("v.isTopo");
        console.log("isTopo: " + isTopo);
        var evt = $A.get("e.c:EventoPuntuacion");
        console.log("evt: " + evt);
        evt.setParams({
            "molePoint": isTopo ? 2 : 0 
        });
        evt.fire();
    } 
})