Events.on(WorldLoadEvent, () => {
try{
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
