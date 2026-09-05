const units = [];

Events.on(ContentInitEvent, () => {
try {

for (let i = 0; i < units.length; i++){

const unit = Vars.content.unit(units[i]);

Object.assign(unit, {
flyingLayer: 123.5,
groundLayer: 123.5,
drawSoftShadow: false,
drawMinimap: false,
targetable: false,
drawShields: false,
stepSound: Sound.none,
tankMoveSound: Sound.none,
lightRadius: 1.0
});

}

} catch(e){
Log.err("[red]StealthTemplate - []" + e);
}});
