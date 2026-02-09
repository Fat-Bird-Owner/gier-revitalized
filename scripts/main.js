Events.on(ContentInitEvent, e => { 

Planets.gier.visible = true;
Planets.gier.accessible = true;

});

Events.on(SectorLaunchEvent, event => {
    // Read is there a preset most likely a numbered sector is is null
    if (event.sector.preset == null) return;
    // if it is a preset find the planet's name
    
    if (event.sector.preset.planet.name != "gier") return;
    Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]", "[grey]...[]");

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
