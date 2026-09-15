/*
Events.on(SectorLaunchEvent, () => {
try{

if (!Vars.state.rules || !Vars.state.rules.sector) return;
if (Core.settings.getBool("deranged") == true && Vars.state.isCampaign() && Vars.state.rules.sector == Planets.gier.sectors.get(0)){        
const rule = Vars.state.rules;
rule.unitBuildSpeedMultiplier = 0.95
rule.unitCrashDamageMultiplier = 1.5;
rule.deconstructRefundMultiplier = 0.25;
rule.fog = true;
rule.lighting = true;
Vars.state.wave = 5;
  
}} catch(e){
Vars.ui.showText("bruv",e);
}});
*/

Events.on(UnitSpawnEvent, e => {
try {
if (Core.settings.getBool("deranged") != true) return;
  
let status = Vars.content.statusEffect("gr-torrid");
e.unit.apply(status);
e.unit.applyDynamicStatus();
e.unit.statusMaxHealth(unit.maxHealth + unit.shield);
e.unit.shield = 0;
  
} catch(e){
Log.err("deranged.js" + e);
}});
