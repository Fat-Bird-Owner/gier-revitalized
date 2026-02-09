Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(SectorLaunchEvent, e => { 

if (e.info == null) {
Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","The first of ever.);
}else{
Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is " + e.info.attempts);
}
  

});
/*
Events.on(WorldLoadEvent, event => {

  Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is 0");
  
})
*/
