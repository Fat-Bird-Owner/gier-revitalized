const blocks = ["gr-construction-projector", "gr-construction-dome"]

Events.on(ClientLoadEvent, () => {
try {

for (let i = 0; i < blocks.length; i++){
let block = Vars.content.block(blocks[i]);

if (!block) return;
  
Vars.ui.content.show(block);
Vars.ui.content.hide();
  
block.stats.remove(Stat.ammo)
block.stats.remove(Stat.inaccuracy)
block.stats.remove(Stat.reload)
block.stats.remove(Stat.targetsAir)
block.stats.remove(Stat.targetsGround)
block.stats.remove(Stat.booster)
block.stats.remove(Stat.shootRange)
  
}
  
} catch(e){
//Vars.ui.showText("ProjectorBlock.js", e);
}});
