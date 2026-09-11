function placePrefix(bundleName, prefix){
let bundle = Core.bundle.get(bundleName);
Core.bundle.properties.put(bundleName, prefix + " " + Core.bundle.get(bundleName));
}

Events.on(ContentInitEvent, e => { 
try{ 
Team.get(5).setPalette(Color.valueOf("A4CBE0"));
Team.get(5).emoji = "[#A4CBE0][]"; 

// old ^ 8ecff5

Team.get(4).setPalette(Color.valueOf("8f55ce"));
Team.get(4).emoji = ""; 

Team.get(7).setPalette(Color.valueOf("C9A5C8FF"));
Team.get(7).emoji = "[#C9A5C8FF][]"; 
Team.get(7).name = "Crystalline Critters"
Team.get(7).ignoreUnitCap = true;
  
Planets.gier.clearSectorOnLose = true;
//Planets.gier.parent = Vars.content.planet("gr-kela");
Planets.gier.updateLighting = true;

/*
Vars.maxSchematicSize = 3064;
MapResizeDialog.maxSize = 2500;
*/
  
const kela = Vars.content.planet("gr-kela");
kela.techTree = Planets.gier.techTree;
kela.techTree.addPlanet(kela);
kela.defaultEnv = Planets.tantros.defaultEnv;
kela.generator = new TantrosPlanetGenerator();
kela.meshLoader = () => new HexMesh(kela, 6);
Core.app.post(() => kela.reloadMesh());

kela.ruleSetter = Planets.gier.ruleSetter;
Planets.gier.ruleSetter = r => {
r.waveTeam = Team.blue;
}

// Cleaned up
placePrefix("database-tag.adv-plastanium", Items.plastanium.emoji());
placePrefix("database-tag.adv-oxide", Items.oxide.emoji());
placePrefix("database-tag.adv-surge-alloy", Items.surgeAlloy.emoji());
placePrefix("database-tag.crystal-bug", Blocks.crystalCluster.emoji());
placePrefix("database-tag.circuit-logic", String.fromCharCode(Iconc.link));
placePrefix("database-tag.gier", String.fromCharCode(Iconc.commandRally));
placePrefix("database-tag.adv-scrap", Items.scrap.emoji());
placePrefix("database-tag.adv-depleted-thorium", String.fromCharCode(64001));
placePrefix("database-tag.adv-thorium", Items.thorium.emoji());
placePrefix("database-tag.adv-phase-fabric", Items.phaseFabric.emoji());
placePrefix("database-tag.adv-dense-alloy", String.fromCharCode(64002));
placePrefix("database-tag.adv-cualbult", String.fromCharCode(64003));
placePrefix("database-tag.freight-block", String.fromCharCode(64004));
  
} catch(e){
Vars.ui.showText("Startup.js Crash", e);
}});



/// Startup dialog
Events.on(ClientLoadEvent, e => { 
try{

Vars.content.block("gr-hyper-dome").itemConsumer = Vars.content.block("gr-hyper-dome").consumeItem(Items.phaseFabric).boost();
  
Vars.ui.settings.addCategory("Gier: Revitalized[]", Icon.menu, t => {

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

t.checkPref("doomsday", false, b => {});

t.checkPref("gr-wall-no-dark", false, b => {});

t.checkPref("water-shader", false, b => {});

t.checkPref("shaders", true, b => {});

t.checkPref("quality-wrecks", false, b => {});
  
t.row();
t.button(Core.bundle.get("settings.researchReset"), () => {
try {

Vars.ui.showConfirm(Core.bundle.get("comfirm.researchReset") , () => {
try {

Vars.content.each(c => {
try {
if (c instanceof UnlockableContent){
if (c.minfo != null && c.minfo.mod != null && "gr".equals(c.minfo.mod.name)){

c.clearUnlock();
c.techNode.reset();
Vars.universe.clearLoadoutInfo();

}}} catch(e){Vars.ui.showInfoToast(e,5)}
});
  
} catch(e){}
})
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}}).margin(14).width(240).pad(6);
  
});

const display = Core.bundle.get("mod.gr.display");
const title = Core.bundle.get("mod.gr.mail");

if (Core.settings.getBool("command-block-texture") != true){        
Vars.content.block("gr-command-block").region = Core.atlas.find("gr-command-block-modern");
}

if (Core.settings.getBool("doomsday") == true){
Vars.content.each(c => {
try {

if (c instanceof Block){
c.baseExplosiveness = 1000;
}
  
} catch(e){
Vars.ui.showText("startup", e);
}});

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

if (Core.settings.getBool("gr-wall-no-dark") == true){

Vars.content.each(c => {
try {

if (c instanceof StaticWall){
c.forceDark = false;
c.fillsTile = false;
}
  
} catch(e){
Vars.ui.showText("startup", e);
}});
  
}
  
} catch(e) {
Vars.ui.showText("Not work",e,Align.center);
}});

