let target = null;
let transitBlock = null;

Events.on(BuildDamageEvent, event => {
try {
const {build, source} = event;

if (target == null || transitBlock = null) {
target = Vars.content.block("gr-refined-scrap-barracade");
transitBlock = Vars.content.block("gr-scrap-piled-barracade");
} 

if (build && build.block == target && build.health <= (build.block.health / 2) && build.health > 0) return;

const altHealth = build.health
  
const {tile} = build;
tile.setBlock(transitBlock, build.team, 0);
tile.build.health = altHealth;

const fx = Object.assign(new ParticleEffect(), {
sizeFrom: 3,
sizeTo: 0,
region: Core.atlas.find("item-scrap"),
particles: 7,
lifetime: 130,
length: 22,
layer: 21,
spin: Mathf.random(0.05, 0.1),
colorTo: Color.valueOf("ffffff"),
colorFrom: Color.valueOf("ffffff"),
offset: source.rotation(),
sizeInterp: Interp.pow10In,
interp: Interp.pow10Out,
cone: 25
});

fx.at(source.x, source.y);
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - damageShiftWall",5);
}});
