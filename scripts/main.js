Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(SectorLaunchEvent, e => { 
var attempt = e.info.attempts;
Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is " + attempt);
});
