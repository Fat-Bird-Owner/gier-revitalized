Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(SectorLaunchEvent, e => { 
var attempt = e.info.attempts;
e.generateEnemyBase = true,
if (attempt == null) return;
  
Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is " + attempt);
});

Events.on(WorldLoadEvent, event => {

  Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is 0");
  
})
