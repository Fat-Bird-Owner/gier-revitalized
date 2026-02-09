Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(WorldLoadEvent, e => {

    if (Planets.gier == null) return;
    
    Planets.gier.techTree.each(node => {
        if(node.content.unlocked){
            node.content.clearUnlock();
        }
    });

});;
