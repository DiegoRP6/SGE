
({
    doInit: function(cmp) {
        var topo = cmp.find("topo");
        Math.random() < 0.5 ? $A.util.addClass(topo, 'active') : $A.util.addClass(topo, 'inactive') ;
        
        // var number =Math.random() ;
        // if(number < 0.5){
        //     $A.util.addClass(cmp, 'active');
        // }else{
        //     $A.util.addClass(cmp, 'inactive');
        // }
    
    }
})