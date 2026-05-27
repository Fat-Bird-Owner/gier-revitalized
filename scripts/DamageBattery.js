
Events.on(BuildDamageEvent, event => {

try {

const source = event.source;
const build = event.build;

if (!build || !source) return;
    
const block = event.build.block;
const targetType = Vars.content.getByName(ContentType.block, "gr-power-cell");
const targetType2 = Vars.content.block("gr-surge-pile");
    
if (block == targetType || block == targetType2){
if (!build.power || !build.power.graph) return;
if (build.power.graph.getBatteryStored() <= 0) return;
    
const damage = source.damage;
const minus = damage * -1.75;
const length = damage * 0.75;
    
build.power.graph.transferPower(minus);
Fx.generate.at(build.x,build.y);
block.configureSound.at(build.x,build.y);
    
Lightning.create(
    build.team,
    build.team.color,
    damage,
    build.x,
    build.y,
    Mathf.random(360),
    length
);
    
}
    
} catch(e){
Vars.ui.showInfoToast("error: " + e,1);
}
    
})
