// Damage Receiver
Events.on(BuildDamageEvent, event => {
try{
const build = event.build;
const source = event.source;
const target = Vars.content.getByName(ContentType.block, "gr-ton-crusher");
const target2 = Vars.content.block("gr-heavy-excavator");
    
if (!build || !source) return;
if ((build.block != target && build.block != target2) || build.enabled == false || build.status() != BlockStatus.active) return;

const damageExtra = source.damage * 2.75;
build.damage(damageExtra);
Fx.flakExplosion.at(source.x, source.y);
Sounds.shootScepter.at(source.x,source.y);

} catch(e) {
Vars.ui.showInfoToast(e,5);
}
})



// On tap disabler
Events.on(TapEvent, event => {
try{
const tile = event.tile;
const player = event.player;

if (!player || !player.team() || tile.build == null || tile.build.team != player.team()) return;
const block = tile.block();
const build = tile.build;
const target = Vars.content.getByName(ContentType.block,"gr-ton-crusher");

    
if (block == target || block == Vars.content.block("gr-heavy-excavator")){
const enabled = build.enabled;
build.enabled = !enabled;
Sounds.click.at(build.x,build.y);
}

} catch(e) {
Vars.ui.showInfoToast(e,4.5);
}
})
