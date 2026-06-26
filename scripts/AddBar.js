const blocks = [
"gr-sunder-furnace",
"gr-oxidization-reactor",
"gr-steam-turbine",
"gr-button",
"gr-actuator",
"gr-sealent-chamber",
"gr-sealent-chamber-oil",
"gr-plastanium-crusher"
]

Events.on(ContentInitEvent, () => {
try{

function giveBar(string){
const block = Vars.content.block(string);
if (!block) return;
if (block instanceof VariableReactor){
block.removeBar("instability");
return;
}

if (block instanceof PowerGenerator){
block.removeBar("power");
return;
}

if (block instanceof UnitAssembler){

Vars.ui.content.show(block);
Vars.ui.content.hide();
block.stats.replace(Stat.output, StatValues.content(block.filter));
  
return;
}
  
block.addBar("progress", e => new Bar(
"Process", 
Pal.lightOrange,
() => e && e.progress > 0 ? e.progress : 0));
}

for (let i = 0; i < blocks.length; i++){
giveBar(blocks[i]);
}
  
} catch(e){
Vars.ui.showText("G:R - AddBar", e);
}});
