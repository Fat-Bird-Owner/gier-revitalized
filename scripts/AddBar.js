const blocks = [
"gr-sunder-furnace",
"gr-oxidization-reactor",
"gr-steam-turbine",
"gr-button",
"gr-actuator",
"gr-sealent-chamber",
"gr-sealent-chamber-oil",
"gr-plastanium-crusher",
"gr-imprinter-assembler"
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
  
block.addBar("Blocks", e => new Bar(
"Blocks", 
Pal.items,
() => e && e.blocks.total() > 0 ? e.blocks : 0));
}
  
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
Vars.ui.showInfoToast(e,15);
}});
