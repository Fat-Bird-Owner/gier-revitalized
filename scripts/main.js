Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(SectorLaunchEvent, event => {
    // make sure sector exists
    if(!event.sector) return;

    // make sure we have a preset (null if not a numbered campaign sector)
    if(!event.sector.preset) return;

    // make sure planet exists
    if(!preset.planet) return;

    // check planet name
    if(planet.name !== "gier") return;

    Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","[grey]...[]");
});

/*
Events.on(WorldLoadEvent, event => {

  Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is 0");
  
})
*/
Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

/*
Events.on(SectorLaunchEvent, e => {

    var info = e.sector.info;

    if(info == null){
        Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]", "The first of ever.");
    }else{
        Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]",
            "Your current attempt count is " + info.attempts);
    }

});
*/
/*
Events.on(WorldLoadEvent, event => {

  Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is 0");
  
})
*/
