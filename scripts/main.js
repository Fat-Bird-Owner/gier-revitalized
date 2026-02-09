Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(WorldLoadEvent, e => {

    var parent = TechTree.all.find(u => u.content.name == "gr-gier");
    
    parent.each(node => {
        if(node.content.unlocked){
            node.content.clearUnlock();
        }
    });

});
