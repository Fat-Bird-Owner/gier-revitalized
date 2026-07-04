// The blocks that will be given stats on contentInit
const mechPads = [
"gr-mechanical-pad",
"gr-drive-bay",
"gr-spark-bay",
"gr-disrupter-bay",
"gr-barracade-bay"
];

// Basically an init for this override class
Events.on(ContentInitEvent, () => {
try{
const buildTime = new Stat("buildTime", StatCat.crafting);

function mechPadBuild(string){
const pad = Vars.content.block(string);
if (!pad || !(pad instanceof UnitCargoLoader)) return;

pad.addBar("progress", e => new Bar("Progress",Pal.lightOrange, () => e && e. buildProgress > 0 ? e. buildProgress : 0 ));
pad.stats.add(buildTime, pad.unitBuildTime/60 , StatUnit.seconds); 
pad.stats.add(Stat.output, StatValues.content(pad.unitType));
}

for (let i = 0; i < mechPads.length; i++){
mechPadBuild(mechPads[i]);
}
  
} catch(e){
Vars.ui.showInfoText(e,10);
}}); 
