Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(WorldLoadEvent, e => { 

TechTree.all.each(node => {
    if(node.content != null &&
       node.content.planet != null &&
       node.content.planet == Planets.gier){

        node.clearUnlock();
    }
});

});
