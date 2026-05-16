

Events.on(ContentInitEvent, e => { 
try{ 
Team.get(5).setPalette(Color.valueOf("A4CBE0"));
Team.get(5).emoji = "[#A4CBE0][]"; 

// old ^ 8ecff5

Team.get(4).setPalette(Color.valueOf("8f55ce"));
Team.get(4).emoji = ""; 

Planets.gier.visible = true;
Planets.gier.accessible = true;
Planets.gier.alwaysUnlocked = true;
Planets.gier.clearSectorOnLose = true;
Planets.gier.parent = Vars.content.planet("gr-kela");
Planets.gier.updateLighting = true;
  
Vars.maxSchematicSize = 3064;
MapResizeDialog.maxSize = 2500;

const kela = Vars.content.getByName(ContentType.planet, "gr-kela");
kela.techTree = Planets.gier.techTree;
kela.techTree.addPlanet(kela);
kela.defaultEnv = Planets.tantros.defaultEnv;
kela.generator = new TantrosPlanetGenerator();
kela.meshLoader = () => new HexMesh(kela, 6);
Core.app.post(() => kela.reloadMesh());
  
Planets.gier.ruleSetter = r => {
r.waveTeam = Team.blue;
}



kela.ruleSetter = Planets.gier.ruleSetter;

const plast = Core.bundle.get("database-tag.adv-plastanium");
Core.bundle.properties.put("database-tag.adv-plastanium", Items.plastanium.emoji() + " " + plast);

const oxide = Core.bundle.get("database-tag.adv-oxide");
Core.bundle.properties.put("database-tag.adv-oxide", Items.oxide.emoji() + " " + oxide);

const crystal = Core.bundle.get("database-tag.crystal-bug");
Core.bundle.properties.put("database-tag.crystal-bug", Blocks.crystalCluster.emoji() + " " + crystal);

const circuitLogic = Core.bundle.get("database-tag.circuit-logic");
Core.bundle.properties.put("database-tag.circuit-logic", String.fromCharCode(Iconc.link) + " " + circuitLogic);
  
} catch(e){
Vars.ui.showText("Startup.js Crash", e);
}});



/// Startup dialog
Events.on(ClientLoadEvent, e => { 
try{


Vars.ui.settings.addCategory("[sky]Gier: Revitalized[]", Icon.menu, t => {

t.checkPref("startup", false, b => {});
t.checkPref("disable-plague", false, b => {
try{

if (b == true){
Vars.content.liquid("gr-plague").viscosity = 0;
} else {
Vars.content.liquid("gr-plague").viscosity = 5;
}
                
} catch(e){
Vars.ui.showInfoToast(e,10);
}});

t.checkPref("command-block", false, b => {
try{

const block = Vars.content.block("gr-command-block");
                
if (b == true){
block.buildVisibility = BuildVisibility.shown;
} else {
block.buildVisibility = BuildVisibility.worldProcessorOnly;
}
                
} catch(e){
Vars.ui.showInfoToast(e,10);
}});

t.checkPref("command-block-texture", false, b => {
try{

const block = Vars.content.block("gr-command-block");
                
if (b == true){
block.region = Core.atlas.find("gr-command-block");
} else {
block.region = Core.atlas.find("gr-command-block-modern");
}
                
} catch(e){
Vars.ui.showInfoToast(e,10);
}});

t.checkPref("deranged", false, b => {});

t.checkPref("wreckEnabled", true, b => {});

t.checkPref("unitWreckEnabled", false, b => {});
  
});

  
const display = Core.bundle.get("mod.gr.display");
const title = Core.bundle.get("mod.gr.mail");

if (Core.settings.getBool("command-block-texture") != true){        
Vars.content.block("gr-command-block").region = Core.atlas.find("gr-command-block-modern");
}
  
if (Core.settings.getBool("startup") != true){        
Vars.ui.showText(title,display);
} 

if (Core.settings.getBool("disable-plague") == true){        
Vars.content.liquid("gr-plague").viscosity = 0;
}

if (Core.settings.getBool("command-block") == true){        
Vars.content.block("gr-command-block").buildVisibility = BuildVisibility.shown;
}
  
} catch(e) {
Vars.ui.showText("Not work",e,Align.center);
}})
