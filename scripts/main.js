Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(WorldLoadEvent, e => {

    Planets.gier.techTree.each(node => {
        if(node.unlocked()){
            node.clearUnlock();
        }
    });

});;
