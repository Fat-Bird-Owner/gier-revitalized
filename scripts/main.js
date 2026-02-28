

Events.on(ContentInitEvent, e => { 

Team.get(5).setPalette(Color.valueOf("8ecff5"));
Team.get(5).emoji = "[#8ecff5][]"; 
    
Planets.gier.visible = true;
Planets.gier.accessible = true;
Planets.gier.alwaysUnlocked = true;
Planets.gier.clearSectorOnLose = true;

Vars.maxSchematicSize = 3064;

Planets.gier.ruleSetter = rules => {
rules.waveTeam = Team.blue;
rules.dynamicColor = new Color(0,0,0,0.75);
rules.modeName = "Endless/Asteroid";
/*
rules.placeRangeCheck = false;
rules.showSpawns = true;
rules.onlyDepositCore = true;
rules.cleanupDeadTeams = true;
*/
}

});
/*
Events.on(SectorLaunchEvent, event => {
    // make sure sector exists
    if(!event.sector) return;

    // make sure we have a preset (null if not a numbered campaign sector)
    if(!event.sector.preset) return;

    // make sure planet exists
    if(!event.sector.preset.planet) return;

    // check planet name
    if(event.sector.preset.planet.name !== "gier") return;

    Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","[grey]...[]");
});
*/
/*
Events.on(WorldLoadEvent, event => {

  Vars.ui.showInfoText("[lightgrey]Gier: The Asteroid Belt[]","Your current attempt count is 0");
  
})
*/

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

Planets.gier.ruleSetter = rules => {
rules.waveTeam = Team.blue;
rules.onlyDepositCore = true;
//rules.cleanupDeadTeams = true;
}
  
})
*/
