let target = null;
let transitBlock = null;

Events.on(BuildDamageEvent, event => {
try {
const {build, source} = event;

if (target == null || transitBlock = null) {
target = Vars.content.block("gr-refined-scrap-barracade");
transitBlock = Vars.content.block("gr-scrap-piled-barracade");
} 

if (build && build.block != target && build.health > (build.block.health / 2)) return;

const altHealth = build.health
  
const {tile} = build;
tile.setBlock(transitBlock, build.team, 0);
tile.build.health = altHealth;

} catch(e){
Vars.ui.showInfoToast(e + "[red] - damageShiftWall",5);
}});
